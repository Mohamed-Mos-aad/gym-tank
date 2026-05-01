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

    const data = await prisma.member.findMany({
        where: {
            gymId: gym.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return { data };
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