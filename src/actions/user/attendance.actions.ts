'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";




export const getAttendanceListAction = async (
    userId?: string,
    page = 1,
    limit = 10
) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    if (!userId) {
        return {
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }

    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });

    const gymId = gym?.id;

    if (!gymId) {
        return {
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        prisma.attendance.findMany({
            where: {
                gymId,
                checkIn: {
                    gte: startOfDay,
                },
            },
            include: {
                member: {
                    select: {
                        name: true,
                        phone: true,
                        subscriptionType: true,
                        subscriptionStatus: true,
                        startDate: true,
                        endDate: true,
                    },
                },
            },
            orderBy: { checkIn: "desc" },
            skip,
            take: limit,
        }),
        prisma.attendance.count({
            where: { gymId },
        }),
    ]);

    return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};



// ** Create
export const createAttendanceAction = async (memberId: string) => {
    const userId = ( await cookies()).get("gym_tank_token" )?.value;
    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });
    const gymId = gym?.id;
    const now = new Date();

    const member = await prisma.member.findUnique({
        where: { id: memberId },
    });

    if (!member) {
        throw new Error("العضو غير موجود");
    }
    
    if (!gymId) {
        throw new Error("الجيم غير موجود");
    }


    if (member.endDate && member.endDate < now) {
        throw new Error("اشتراك العضو منتهي، يرجى التجديد أولاً");
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const alreadyCheckedIn = await prisma.attendance.findFirst({
        where: {
        memberId,
        checkIn: {
            gte: startOfDay,
        },
        },
    });

    if (alreadyCheckedIn) {
        throw new Error("تم تسجيل دخول هذا العضو بالفعل اليوم");
    }


    const attendance = await prisma.attendance.create({
        data: {
        memberId,
        gymId,
        },
    });
    revalidatePath("/members");
    return attendance;
};

export const createCheckoutAction = async (memberId: string) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;

    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });

    const gymId = gym?.id;
    const now = new Date();

    if (!gymId) {
        throw new Error("الجيم غير موجود");
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const attendance = await prisma.attendance.findFirst({
        where: {
            memberId,
            gymId,
            checkIn: {
                gte: startOfDay,
            },
        },
        orderBy: {
            checkIn: "desc",
        },
    });

    if (!attendance) {
        throw new Error("لم يتم تسجيل دخول هذا العضو اليوم");
    }

    if (attendance.checkOut) {
        throw new Error("تم تسجيل انصراف هذا العضو بالفعل");
    }

    // تحديث الانصراف
    const updatedAttendance = await prisma.attendance.update({
        where: {
            id: attendance.id,
        },
        data: {
            checkOut: now,
        },
    });

    revalidatePath("/members");

    return updatedAttendance;
};