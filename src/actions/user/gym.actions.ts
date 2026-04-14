'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";




// ** Get
export const getGymAction = async () => {
    const userId = (await cookies()).get("gym_tank_token")?.value;

    if (!userId) throw new Error("User not found");

    const gym = await prisma.gym.findUnique({
        where: { ownerId: userId },
    });

    if (!gym) throw new Error("Gym not found");


    return gym;
};