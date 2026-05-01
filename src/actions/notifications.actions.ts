"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getAdminNotifications() {
    try {
        // Fetch notifications for ANY admin for now (simplified)
        const notifications = await prisma.notification.findMany({
            where: { type: { in: ["SYSTEM", "GYM_REGISTRATION", "SUBSCRIPTION"] } },
            orderBy: { createdAt: "desc" },
            take: 10
        });
        return notifications;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }
}

export async function getUserNotifications() {
    try {
        const userId = (await cookies()).get("gym_tank_token")?.value;
        if (!userId) return [];

        const notifications = await prisma.notification.findMany({
            where: { userId: userId },
            orderBy: { createdAt: "desc" },
            take: 10
        });
        return notifications;
    } catch (error) {
        console.error("Error fetching user notifications:", error);
        return [];
    }
}

export async function markNotificationAsRead(id: string) {
    try {
        await prisma.notification.update({
            where: { id },
            data: { isRead: true }
        });
        return { success: true };
    } catch (error) {
        console.error("Error marking notification as read:", error);
        return { success: false };
    }
}

export async function markAllAdminNotificationsAsRead() {
    try {
        await prisma.notification.updateMany({
            where: { isRead: false },
            data: { isRead: true }
        });
        revalidatePath("/admin/notifications");
        return { success: true };
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
        return { success: false };
    }
}

export async function markAllUserNotificationsAsRead() {
    try {
        const userId = (await cookies()).get("gym_tank_token")?.value;
        if (!userId) return { success: false };

        await prisma.notification.updateMany({
            where: { userId: userId, isRead: false },
            data: { isRead: true }
        });
        return { success: true };
    } catch (error) {
        console.error("Error marking all user notifications as read:", error);
        return { success: false };
    }
}

export async function sendBroadcastNotification(data: { title: string, message: string, target: 'ALL' | string }) {
    try {
        if (data.target === 'ALL') {
            const users = await prisma.user.findMany({ select: { id: true } });
            await prisma.notification.createMany({
                data: users.map(user => ({
                    userId: user.id,
                    title: data.title,
                    message: data.message,
                    type: "SYSTEM",
                }))
            });
        } else {
            await prisma.notification.create({
                data: {
                    userId: data.target,
                    title: data.title,
                    message: data.message,
                    type: "SYSTEM",
                }
            });
        }
        
        revalidatePath("/admin/notifications");
        return { success: true };
    } catch (error) {
        console.error("Error sending broadcast:", error);
        return { success: false };
    }
}
