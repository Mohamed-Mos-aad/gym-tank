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
