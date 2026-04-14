'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";




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

    const gym = await prisma.gym.findUnique({
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
