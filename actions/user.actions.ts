'use server';

import { prisma } from "@/lib/prisma";

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