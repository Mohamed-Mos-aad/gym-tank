"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdminDashboardStats() {
    try {
        const totalGyms = await prisma.gym.count();
        const activeGyms = await prisma.gym.count({ where: { status: "APPROVED" } });
        const pendingGyms = await prisma.gym.count({ where: { status: "PENDING" } });
        const totalUsers = await prisma.user.count();
        // Since we don't have real revenue yet, just pass a placeholder or count subscriptions
        const activeSubscriptions = await prisma.gymSubscription.count({ where: { status: "ACTIVE" } });

        const recentGyms = await prisma.gym.findMany({
            take: 4,
            orderBy: { createdAt: "desc" },
            include: { owner: true }
        });

        return {
            totalGyms,
            activeGyms,
            pendingGyms,
            totalUsers,
            activeSubscriptions,
            recentGyms
        };
    } catch (error) {
        console.error("Error fetching admin stats", error);
        return {
            totalGyms: 0,
            activeGyms: 0,
            pendingGyms: 0,
            totalUsers: 0,
            activeSubscriptions: 0,
            recentGyms: []
        };
    }
}

export async function getAdminGyms() {
    try {
        const gyms = await prisma.gym.findMany({
            orderBy: { createdAt: "desc" },
            include: { 
                owner: true,
                _count: {
                    select: { members: true }
                }
            }
        });
        return gyms;
    } catch (error) {
        console.error("Error fetching gyms list", error);
        return [];
    }
}

export async function updateGymStatus(gymId: string, status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED") {
    try {
        await prisma.gym.update({
            where: { id: gymId },
            data: { status }
        });
        revalidatePath("/admin/gyms");
        return { success: true };
    } catch (error) {
        console.error("Error updating gym status", error);
        return { success: false };
    }
}

export async function getAdminUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { gyms: true }
                }
            }
        });
        return users;
    } catch (error) {
        console.error("Error fetching admin users", error);
        return [];
    }
}

