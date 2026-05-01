"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
        return { success: true };
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
        return { success: false };
    }
}
