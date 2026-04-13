'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; 
import cookieStore from "@/utils/cookies";
import { cookies } from "next/headers";




const gymId = cookieStore.getToken()?.value;


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
    const data = await prisma.member.findMany();
    console.log(gymId)
    return { data };
};


export const createMemberAction = async (memberData)=>{
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



// ** Calc

export const getDashboardStats = async () => {
    const now = new Date();

    const [members, active, expired] = await Promise.all([
        prisma.member.count(),
        prisma.member.count({
        where: { endDate: { gte: now } },
        }),
        prisma.member.count({
        where: { endDate: { lt: now } },
        }),
    ]);

    return { members, active, expired };
};