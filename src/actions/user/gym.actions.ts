'use server';
// ** Hooks && Tools
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";




// ** Get
export const getGymAction = async () => {
    const userId = (await cookies()).get("gym_tank_token")?.value;

    if (!userId) throw new Error("User not found");

    const gym = await prisma.gym.findFirst({
        where: { ownerId: userId },
        include: {
            subscriptions: true,
            paymentRequests: true
        }
    });

    if (!gym) throw new Error("Gym not found");

    const gymObj = JSON.parse(JSON.stringify(gym));
    let prices = "{}";
    let currency = "ر.س";
    if (gymObj.state) {
        try {
            const parsed = JSON.parse(gymObj.state);
            if (parsed.prices) prices = parsed.prices;
            if (parsed.currency) currency = parsed.currency;
        } catch (e) {}
    }
    gymObj.memberSubscriptionPrices = prices;
    gymObj.currency = currency;

    return gymObj;
};

export const createPaymentRequestAction = async (planId: string, method: string, amount: number, notes?: string) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) throw new Error("Unauthorized");

    const gym = await prisma.gym.findFirst({ where: { ownerId: userId } });
    if (!gym) throw new Error("Gym not found");

    await prisma.paymentRequest.create({
        data: {
            gymId: gym.id,
            planId: planId,
            amount: amount,
            method: method,
            notes: notes,
            status: "PENDING"
        }
    });

    return { success: true };
};

export const activateFreeTrialAction = async (planId: string) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) throw new Error("Unauthorized");

    const gym = await prisma.gym.findFirst({ where: { ownerId: userId } });
    if (!gym) throw new Error("Gym not found");

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan || plan.price !== 0) throw new Error("Invalid free plan");

    const existingSub = await prisma.gymSubscription.findFirst({
        where: { gymId: gym.id, status: "ACTIVE" }
    });
    if (existingSub) throw new Error("Gym already has an active subscription");

    const now = new Date();
    const endDate = new Date();
    // @ts-ignore
    endDate.setDate(now.getDate() + (plan.durationDays || 14));

    await prisma.gymSubscription.create({
        data: {
            gymId: gym.id,
            planName: plan.name,
            status: "ACTIVE",
            startDate: now,
            endDate: endDate
        }
    });

    return { success: true };
};

export const getUserLogsAction = async () => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) throw new Error("Unauthorized");

    const logs = await prisma.auditLog.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
        take: 100
    });

    return logs;
};

export const updateGymInfoAction = async (data: any) => {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    if (!userId) throw new Error("Unauthorized");

    const gym = await prisma.gym.findFirst({ where: { ownerId: userId } });
    if (!gym) throw new Error("Gym not found");

    await prisma.gym.update({
        where: { id: gym.id },
        data: {
            name: data.name,
            specialty: data.specialty,
            phone: data.phone,
            email: data.email,
            address: data.address,
            // @ts-ignore
            capacity: data.capacity ? parseInt(data.capacity) : undefined,
            // @ts-ignore
            memberSubscriptionTypes: data.memberSubscriptionTypes ? data.memberSubscriptionTypes : undefined,
            state: JSON.stringify({
                prices: data.memberSubscriptionPrices !== undefined ? data.memberSubscriptionPrices : "{}",
                currency: data.currency ? data.currency : "ر.س"
            })
        }
    });

    revalidatePath("/user/setting");
    revalidatePath("/user/subscribes");

    return { success: true };
};

export const createSupportInquiryAction = async (data: { name: string, email: string, subject: string, message: string }) => {
    await prisma.supportInquiry.create({
        data: {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            status: "NEW"
        }
    });

    return { success: true };
};