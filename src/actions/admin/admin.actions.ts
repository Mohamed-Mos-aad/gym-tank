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
        const chartData = [];
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

