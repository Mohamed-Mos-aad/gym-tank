'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";




// ** Get
export const getUserAction = async (ownerId) => {
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

    const gym = await prisma.gym.findUnique({
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