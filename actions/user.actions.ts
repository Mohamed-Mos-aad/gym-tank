'use server';

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // لتشفير كلمة المرور


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




// ** Members
export const getMembersListAction = async () => {
    const data = await prisma.member.findMany();

    return { data };
};


export const createMemberAction = async (memberData)=>{
    await prisma.member.create({
        data: {
            ...memberData,
            gym: {
                connect: { id: '69db76d4cba2f42b91a1fe4c' }
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
                connect: { id: '69db76d4cba2f42b91a1fe4c' }
            }
        }
    })
}