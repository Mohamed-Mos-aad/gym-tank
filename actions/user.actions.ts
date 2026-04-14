'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; 
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";




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

    (
        await cookies()).set("gym_tank_token", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        }
    );

    return user;
};




// ** Members
export const getMembersListAction = async () => {
    const userId = (await cookies()).get("gym_tank_token")?.value;

    if (!userId) throw new Error("User not found");

    const gym = await prisma.gym.findUnique({
        where: { ownerId: userId },
    });

    if (!gym) throw new Error("Gym not found");

    console.log(gym.id,userId)
    const data = await prisma.member.findMany({
        where: {
            gymId: gym.id, // 👈 أهم سطر
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return { data };
};

export const createMemberAction = async (memberData)=>{
    const userId = ( await cookies()).get("gym_tank_token" )?.value;
    const gym = await prisma.gym.findUnique({
        where: { ownerId: userId },
    });
    const gymId = gym?.id;

    await prisma.member.create({
        data: {
            ...memberData,
            gym: {
                connect: { id: gymId }
            }
        }
    })
}

export const updateMemberAction = async (memberId, memberData)=>{
    const userId = ( await cookies()).get("gym_tank_token" )?.value;
    const gym = await prisma.gym.findUnique({
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
export const createAttendanceAction = async (memberId: string) => {
    const userId = ( await cookies()).get("gym_tank_token" )?.value;
    const gym = await prisma.gym.findUnique({
        where: { ownerId: userId },
    });
    const gymId = gym?.id;
    const now = new Date();

    const member = await prisma.member.findUnique({
        where: { id: memberId },
    });

    if (!member) {
        throw new Error("Member not found");
    }
    
    if (!gymId) {
        throw new Error("Gym not found");
    }


    if (member.endDate && member.endDate < now) {
        throw new Error("Subscription expired");
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
        throw new Error("Member already checked in today");
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
export const getAttendanceListAction = async (page = 1, limit = 10) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);


    const userId = (await cookies()).get("gym_tank_token")?.value;
    const gym = await prisma.gym.findUnique({
        where: { ownerId: userId },
    });
    const gymId = gym?.id;

    if (!gymId) throw new Error("Gym not found");

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
                    endDate: true
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
export const getDashboardStats = async () => {
    const now = new Date();
    const userId = (await cookies()).get("gym_tank_token")?.value;
    const gym = await prisma.gym.findUnique({
        where: { ownerId: userId },
    });
    const gymId = gym?.id;

    if (!gymId) throw new Error("Gym not found");
    const [members, active, expired, presentNow] = await Promise.all([
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
    ]);
    return {
        members,
        active,
        expired,
        presentNow,
    };
};