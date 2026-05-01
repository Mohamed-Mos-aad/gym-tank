'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";




// ** Get
export const getGymAction = async () => {
    const userId = (await cookies()).get("gym_tank_token")?.value;

    if (!userId) throw new Error("User not found");

    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });

    if (!gym) throw new Error("Gym not found");


    return gym;
};

export const createPaymentRequestAction = async (planId: string, method: string, amount: number, notes?: string) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) throw new Error("Unauthorized");

    const gym = await prisma.gym.findFirst({ where: { ownerId: userId } });
    if (!gym) throw new Error("Gym not found");

    await prisma.paymentRequest.create({
        data: {
            gymId: gym.id,
            planId: planId,
            amount: amount,
            method: method,
            notes: notes,
            status: "PENDING"
        }
    });

    return { success: true };
};

export const getUserLogsAction = async () => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) throw new Error("Unauthorized");

    const logs = await prisma.auditLog.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
        take: 100
    });

    return logs;
};

export const updateGymInfoAction = async (data: any) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) throw new Error("Unauthorized");

    const gym = await prisma.gym.findFirst({ where: { ownerId: userId } });
    if (!gym) throw new Error("Gym not found");

    await prisma.gym.update({
        where: { id: gym.id },
        data: {
            name: data.name,
            specialty: data.specialty,
            phone: data.phone,
            email: data.email,
            address: data.address
        }
    });

    return { success: true };
};

export const createSupportInquiryAction = async (data: { name: string, email: string, subject: string, message: string }) => {
    await prisma.supportInquiry.create({
        data: {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            status: "NEW"
        }
    });

    return { success: true };
};