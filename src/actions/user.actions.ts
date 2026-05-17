'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; 
import { cookies } from "next/headers";




// ** User 
export const createUserAction = async (userData)=>{
    const { gymName, ownerName, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                name: ownerName,
                email,
                password: hashedPassword,
                role: "GYM_OWNER",
            },
        });

        const gym = await tx.gym.create({
            data: {
                name: gymName,
                ownerId: user.id,
                status: "APPROVED", // Directly APPROVED on registration to bypass approval requirement!
            },
        });

        return { user, gym };
    });
}


export const loginUserAction = async (loginData) => {
    const user = await prisma.user.findUnique({
        where: {
            email: loginData.email,
        },
    });

    if (!user) throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(
        loginData.password,
        user.password
    );

    if (!isValid) throw new Error("Invalid credentials");

    (await cookies()).set("gym_tank_token", user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    (await cookies()).set("gym_tank_role", user.role, {
        httpOnly: false, // Accessible by middleware easily
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    return user;
};

export const logoutUserAction = async () => {
    (await cookies()).delete("gym_tank_token");
    (await cookies()).delete("gym_tank_role");
};

export const getCurrentUserAction = async () => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isActive: true,
            }
        });
        return user;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
};




// ** Members
export const getMembersListAction = async () => {
    const userId = (await cookies()).get("gym_tank_token")?.value;

    if (!userId) throw new Error("User not found");

    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });

    if (!gym) throw new Error("Gym not found");

    console.log(gym.id,userId)
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

export const createMemberAction = async (memberData)=>{
    const userId = ( await cookies()).get("gym_tank_token" )?.value;
    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });
    
    if (!gym) throw new Error("Gym not found");
    const gymId = gym.id;

    // ─── Enforce Subscription Limits ───────────────────────────────────────────
    const currentMemberCount = await prisma.member.count({
        where: { gymId }
    });

    const activeSub = await prisma.gymSubscription.findFirst({
        where: { gymId, status: "ACTIVE" }
    });

    let maxMembersLimit = 50; // Default Free limit
    let planLabel = "التجربة المجانية";

    if (activeSub) {
        const plan = await prisma.plan.findFirst({
            where: { name: activeSub.planName }
        });
        if (plan) {
            maxMembersLimit = plan.maxMembers === null ? Infinity : plan.maxMembers;
            planLabel = plan.name;
        }
    }

    if (currentMemberCount >= maxMembersLimit) {
        return { 
            success: false, 
            error: `لقد وصلت للحد الأقصى للأعضاء المسموح به في (${planLabel}) وهو ${maxMembersLimit} عضو. يرجى ترقية اشتراكك لإضافة المزيد.` 
        };
    }
    // ───────────────────────────────────────────────────────────────────────────

    await prisma.member.create({
        data: {
            ...memberData,
            gym: {
                connect: { id: gymId }
            }
        }
    });

    return { success: true };
}

export const updateMemberAction = async (memberId, memberData)=>{
    const userId = ( await cookies()).get("gym_tank_token" )?.value;
    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
    });
    const gymId = gym?.id;

    await prisma.member.update({
        where: {
            id: memberId
        },
        data: {
            ...memberData,
            gym: {
                connect: { id: gymId }
            }
        }
    })
}



// ** Attendance

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


// ** Calc
export const getDashboardStats = async (userId?: string) => {
    const now = new Date();

    const next7Days = new Date();
    next7Days.setDate(now.getDate() + 7);

    // 🛑 حماية أولى
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

    // 🛑 حماية تانية
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