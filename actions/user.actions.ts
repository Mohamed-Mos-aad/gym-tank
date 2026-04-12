import { prisma } from "@/lib/prisma";

export const getTodosListAction = async () => {
    const items = await prisma.member.findMany();

    return {
        items
    };
}