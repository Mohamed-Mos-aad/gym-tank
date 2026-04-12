'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; 
import cookieStore from "@/utils/cookies";




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


export const loginUserAction = async (loginData)=>{
    const data = await prisma.user.findUnique({
        where: {
            email: loginData.email,
            password: loginData.password
        }
    })
    return data
}




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