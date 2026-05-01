'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";




export const getDashboardStats = async (userId?: string) => {
    const now = new Date();

    const next7Days = new Date();
    next7Days.setDate(now.getDate() + 7);


    if (!userId) {
        return {
            members: 0,
            active: 0,
            expired: 0,
            presentNow: 0,
            expiringSoon: 0,
        };
    }

    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });

    const gymId = gym?.id;


    if (!gymId) {
        return {
            members: 0,
            active: 0,
            expired: 0,
            presentNow: 0,
            expiringSoon: 0,
        };
    }

    const [members, active, expired, presentNow, expiringSoon] = await Promise.all([
        prisma.member.count({
            where: { gymId },
        }),

        prisma.member.count({
            where: {
                gymId,
                endDate: { gte: now },
            },
        }),

        prisma.member.count({
            where: {
                gymId,
                endDate: { lt: now },
            },
        }),

        prisma.attendance.count({
            where: {
                gymId,
                checkOut: null,
            },
        }),

        prisma.member.count({
            where: {
                gymId,
                endDate: {
                    gte: now,
                    lte: next7Days,
                },
            },
        }),
    ]);

    return {
        members,
        active,
        expired,
        presentNow,
        expiringSoon,
    };
};