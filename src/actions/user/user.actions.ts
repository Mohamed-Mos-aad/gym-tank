'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// ** Get
export const getUserAction = async (ownerId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: ownerId
        },
    });

    if (!user) throw new Error("Invalid credentials");

    return user;
};

// ** Members
export const getMembersListAction = async (userId?: string) => {
    if (!userId) throw new Error("User not found");

    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });

    if (!gym) throw new Error("Gym not found");

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const data = await prisma.member.findMany({
        where: { gymId: gym.id },
        include: {
            attendances: {
                where: {
                    checkIn: { gte: startOfDay }
                },
                orderBy: { checkIn: "desc" },
                take: 1
            }
        },
        orderBy: { createdAt: "desc" },
    });

    return { 
        data,
        total: data.length,
        page: 1,
        totalPages: 1
    };
};

export const createMemberAction = async (data: any) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) throw new Error("Unauthorized");

    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });

    if (!gym) throw new Error("Gym not found");

    const endDate = new Date();
    if (data.months === 0) {
        endDate.setHours(23, 59, 59, 999);
    } else {
        endDate.setMonth(endDate.getMonth() + (data.months || 1));
    }

    await prisma.member.create({
        data: {
            name: data.name,
            phone: data.phone,
            subscriptionType: data.subscriptionType || "عادي",
            subscriptionStatus: "ACTIVE",
            startDate: new Date(),
            endDate: endDate,
            gymId: gym.id,
        },
    });

    revalidatePath("/user/members");
    return { success: true };
};

export const updateUserProfileAction = async (data: any) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) return { success: false, error: "Unauthorized" };

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return { success: false, error: "User not found" };

        const updateData: any = {
            name: data.name,
            email: data.email,
        };

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

        revalidatePath("/user/setting");
        return { success: true };
    } catch (error: any) {
        console.error("Error updating profile:", error);
        return { success: false, error: "حدث خطأ غير متوقع" };
    }
};

export const renewMemberAction = async (memberId: string, months: number) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) throw new Error("Unauthorized");

    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member) throw new Error("Member not found");

    const currentEndDate = member.endDate ? new Date(member.endDate) : null;
    const now = new Date();
    
    // If membership is already expired or null, start from now. If not, add to the current end date.
    const baseDate = (!currentEndDate || currentEndDate < now) ? now : currentEndDate;
    const newEndDate = new Date(baseDate);
    
    if (months === 0) {
        newEndDate.setHours(23, 59, 59, 999);
    } else {
        newEndDate.setMonth(newEndDate.getMonth() + months);
    }

    await prisma.member.update({
        where: { id: memberId },
        data: {
            endDate: newEndDate,
            subscriptionStatus: "ACTIVE"
        },
    });

    revalidatePath("/user/members");
    return { success: true };
};

export const deleteMemberAction = async (memberId: string) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) throw new Error("Unauthorized");

    await prisma.member.delete({
        where: { id: memberId },
    });

    revalidatePath("/user/members");
    return { success: true };
};

export const updateMemberAction = async (memberId: string, data: any) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) throw new Error("Unauthorized");

    await prisma.member.update({
        where: { id: memberId },
        data: {
            name: data.name,
            phone: data.phone,
            subscriptionType: data.subscriptionType
        },
    });

    revalidatePath("/user/members");
    return { success: true };
};