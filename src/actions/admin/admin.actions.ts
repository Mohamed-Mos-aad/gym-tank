"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdminDashboardStats() {
    try {
        const totalGyms = await prisma.gym.count();
        const activeGyms = await prisma.gym.count({ where: { status: "APPROVED" } });
        const pendingGyms = await prisma.gym.count({ where: { status: "PENDING" } });
        const totalUsers = await prisma.user.count();
        // Since we don't have real revenue yet, just pass a placeholder or count subscriptions
        const activeSubscriptions = await prisma.gymSubscription.count({ where: { status: "ACTIVE" } });

        const recentGyms = await prisma.gym.findMany({
            take: 4,
            orderBy: { createdAt: "desc" },
            include: { owner: true }
        });

        // Calculate gym growth for the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const recentGymsForChart = await prisma.gym.findMany({
            where: { createdAt: { gte: sevenDaysAgo } },
            select: { createdAt: true }
        });

        // Group by day of week (0 = Sunday, 1 = Monday, etc.)
        const growthByDay = [0, 0, 0, 0, 0, 0, 0];
        recentGymsForChart.forEach(gym => {
            const day = gym.createdAt.getDay();
            growthByDay[day]++;
        });

        // Map to an array starting from today going back 7 days
        const today = new Date().getDay();
        const chartData: { day: string; count: number }[] = [];
        const daysAr = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        
        for (let i = 6; i >= 0; i--) {
            const d = (today - i + 7) % 7;
            chartData.push({
                day: daysAr[d],
                count: growthByDay[d]
            });
        }

        // Subscription stats
        const allSubscriptions = await prisma.gymSubscription.groupBy({
            by: ['planName'],
            _count: true
        });

        const subscriptionStats = allSubscriptions.map(s => ({
            name: s.planName,
            count: s._count
        }));

        return {
            totalGyms,
            activeGyms,
            pendingGyms,
            totalUsers,
            activeSubscriptions,
            recentGyms,
            chartData,
            subscriptionStats
        };
    } catch (error) {
        console.error("Error fetching admin stats", error);
        return {
            totalGyms: 0,
            activeGyms: 0,
            pendingGyms: 0,
            totalUsers: 0,
            activeSubscriptions: 0,
            recentGyms: [],
            chartData: [],
            subscriptionStats: []
        };
    }
}

export async function getAdminGyms() {
    try {
        const gyms = await prisma.gym.findMany({
            orderBy: { createdAt: "desc" },
            include: { 
                owner: true,
                _count: {
                    select: { members: true }
                }
            }
        });
        return gyms;
    } catch (error) {
        console.error("Error fetching gyms list", error);
        return [];
    }
}

export async function getAdminGymById(gymId: string) {
    try {
        const gym = await prisma.gym.findUnique({
            where: { id: gymId },
            include: {
                owner: true,
                paymentRequests: {
                    include: { plan: true },
                    orderBy: { createdAt: "desc" }
                },
                subscriptions: {
                    orderBy: { createdAt: "desc" }
                },
                _count: {
                    select: { members: true }
                }
            }
        });
        return gym;
    } catch (error) {
        console.error("Error fetching gym details:", error);
        return null;
    }
}

export async function updateGymStatus(gymId: string, status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED") {
    try {
        await prisma.gym.update({
            where: { id: gymId },
            data: { status }
        });
        revalidatePath("/admin/gyms");
        return { success: true };
    } catch (error) {
        console.error("Error updating gym status", error);
        return { success: false };
    }
}

export async function getAdminUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { gyms: true }
                }
            }
        });
        return users;
    } catch (error) {
        console.error("Error fetching admin users", error);
        return [];
    }
}

export async function updateUserStatus(userId: string, isActive: boolean) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { isActive }
        });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Error updating user status", error);
        return { success: false };
    }
}

export async function createAuditLog(action: string, details?: string) {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) return;

    try {
        await prisma.auditLog.create({
            data: {
                userId,
                action,
                details
            }
        });
    } catch (error) {
        console.error("Error creating audit log:", error);
    }
}

export async function getAuditLogs() {
    try {
        const logs = await prisma.auditLog.findMany({
            orderBy: { createdAt: "desc" },
            take: 100
        });
        return logs;
    } catch (error) {
        console.error("Error fetching audit logs:", error);
        return [];
    }
}

export async function getSupportInquiries() {
    try {
        const inquiries = await prisma.supportInquiry.findMany({
            orderBy: { createdAt: "desc" }
        });
        return inquiries;
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return [];
    }
}

export async function approvePaymentRequest(requestId: string) {
    try {
        const request = await prisma.paymentRequest.findUnique({
            where: { id: requestId },
            include: { plan: true }
        });

        if (!request) return { success: false, error: "Request not found" };

        // 1. Update request status
        await prisma.paymentRequest.update({
            where: { id: requestId },
            data: { status: "APPROVED" }
        });

        // 2. Create or Update Gym Subscription
        // Calculate end date based on plan (assuming monthly for now, or we can add duration to Plan)
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1); // 1 month duration

        await prisma.gymSubscription.create({
            data: {
                gymId: request.gymId,
                planName: request.plan.name,
                status: "ACTIVE",
                startDate: new Date(),
                endDate: endDate
            }
        });

        // 3. Update Gym status to APPROVED if it was PENDING
        await prisma.gym.update({
            where: { id: request.gymId },
            data: { status: "APPROVED" }
        });

        revalidatePath(`/admin/gyms/${request.gymId}`);
        revalidatePath("/admin/dashboard");
        
        return { success: true };
    } catch (error) {
        console.error("Error approving payment:", error);
        return { success: false };
    }
}

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function updateAdminProfileAction(data: any) {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) return { success: false, error: "Unauthorized" };

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return { success: false, error: "User not found" };

        const updateData: any = {
            name: data.name,
            email: data.email,
        };

        // Handle Password Change
        if (data.newPassword) {
            if (!data.currentPassword) {
                return { success: false, error: "يجب إدخال كلمة المرور الحالية لتغييرها" };
            }

            const isPasswordCorrect = await bcrypt.compare(data.currentPassword, user.password);
            if (!isPasswordCorrect) {
                return { success: false, error: "كلمة المرور الحالية غير صحيحة" };
            }

            updateData.password = await bcrypt.hash(data.newPassword, 10);
        }

        await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        revalidatePath("/admin/profile");
        return { success: true };
    } catch (error: any) {
        if (error.code === 'P2002') {
            return { success: false, error: "هذا البريد الإلكتروني مستخدم بالفعل" };
        }
        console.error("Error updating profile:", error);
        return { success: false, error: "حدث خطأ أثناء تحديث البيانات" };
    }
}

