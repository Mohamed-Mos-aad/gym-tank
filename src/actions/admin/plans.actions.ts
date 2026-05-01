"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ─── Plans CRUD ───────────────────────────────────────────────────────────────

export async function getPlans() {
    try {
        const plans = await prisma.plan.findMany({
            orderBy: { createdAt: "asc" },
        });
        return plans;
    } catch (error) {
        console.error("Error fetching plans", error);
        return [];
    }
}

export async function deletePlan(planId: string) {
    try {
        await prisma.plan.delete({ where: { id: planId } });
        revalidatePath("/admin/subscriptions");
        return { success: true };
    } catch (error) {
        console.error("Error deleting plan", error);
        return { success: false };
    }
}

export async function createPlan(data: {
    name: string;
    price: number;
    description?: string;
    features: string[];
    isPopular?: boolean;
}) {
    try {
        await prisma.plan.create({
            data: {
                name: data.name,
                price: data.price,
                description: data.description,
                features: data.features,
                isPopular: data.isPopular || false,
            },
        });
        revalidatePath("/admin/subscriptions");
        return { success: true };
    } catch (error) {
        console.error("Error creating plan", error);
        return { success: false };
    }
}

export async function updatePlan(
    planId: string,
    data: {
        name: string;
        price: number;
        description?: string;
        features: string[];
        isPopular?: boolean;
    }
) {
    try {
        await prisma.plan.update({
            where: { id: planId },
            data: {
                name: data.name,
                price: data.price,
                description: data.description,
                features: data.features,
                isPopular: data.isPopular || false,
            },
        });
        revalidatePath("/admin/subscriptions");
        return { success: true };
    } catch (error) {
        console.error("Error updating plan", error);
        return { success: false };
    }
}

// ─── Subscription Stats ───────────────────────────────────────────────────────

export async function getSubscriptionStats() {
    try {
        // Total active GymSubscriptions
        const totalSubscribers = await prisma.gymSubscription.count({
            where: { status: "ACTIVE" },
        });

        // Estimated revenue: sum price of every active plan × number of active subs per plan
        const plans = await prisma.plan.findMany();
        const subscriptionGroups = await prisma.gymSubscription.groupBy({
            by: ["planName"],
            where: { status: "ACTIVE" },
            _count: true,
        });

        const estimatedRevenue = subscriptionGroups.reduce((total, group) => {
            const plan = plans.find((p) => p.name === group.planName);
            return total + (plan ? plan.price * group._count : 0);
        }, 0);

        // Month-over-month growth: compare this month's new active subs vs last month
        const now = new Date();
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const thisMonthCount = await prisma.gymSubscription.count({
            where: { status: "ACTIVE", createdAt: { gte: startOfThisMonth } },
        });
        const lastMonthCount = await prisma.gymSubscription.count({
            where: {
                status: "ACTIVE",
                createdAt: { gte: startOfLastMonth, lt: startOfThisMonth },
            },
        });

        const growth =
            lastMonthCount === 0
                ? thisMonthCount > 0
                    ? 100
                    : 0
                : Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100);

        return { estimatedRevenue, totalSubscribers, growth };
    } catch (error) {
        console.error("Error fetching subscription stats", error);
        return { estimatedRevenue: 0, totalSubscribers: 0, growth: 0 };
    }
}
