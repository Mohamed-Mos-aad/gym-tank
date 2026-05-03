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
            capacity: 100,
            gymName: "",
            ownerName: "",
            membersExpiringSoon: [],
            recentLogs: []
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
            capacity: 100,
            gymName: "",
            ownerName: "",
            membersExpiringSoon: [],
            recentLogs: []
        };
    }

    const [members, active, expired, presentNow, expiringSoon, recentLogs, gymInfo] = await Promise.all([
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
                checkIn: { gte: new Date(new Date().setHours(0,0,0,0)) },
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

        prisma.attendance.findMany({
            where: { gymId },
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                member: {
                    select: { name: true, subscriptionType: true }
                }
            }
        }),

        prisma.gym.findUnique({
            where: { id: gymId },
            include: {
                owner: {
                    select: { name: true }
                }
            }
        })
    ]);

    return {
        members,
        active,
        expired,
        presentNow,
        expiringSoon,
        gymName: gymInfo?.name,
        ownerName: gymInfo?.owner?.name,
        capacity: gymInfo?.capacity || 100,
        membersExpiringSoon: await prisma.member.findMany({
            where: {
                gymId,
                endDate: {
                    gte: now,
                    lte: next7Days,
                },
            },
            take: 3,
            orderBy: { endDate: 'asc' },
            select: { id: true, name: true, endDate: true, phone: true }
        }),
        recentLogs: recentLogs.map(log => ({
            id: log.id,
            memberName: log.member.name,
            type: log.checkOut ? 'انصراف' : 'دخول',
            time: log.createdAt,
            badge: log.member.subscriptionType || 'عضو'
        }))
    };
};