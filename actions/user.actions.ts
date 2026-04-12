'use server';

import { prisma } from "@/lib/prisma";

export const getMembersListAction = async () => {
    const data = await prisma.member.findMany();

    return { data };
};