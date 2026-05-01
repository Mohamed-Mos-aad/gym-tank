"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGlobalSettings() {
    try {
        let settings = await prisma.globalSettings.findFirst();
        
        if (!settings) {
            // Create default settings if none exist
            settings = await prisma.globalSettings.create({
                data: {
                    platformName: "GymTank",
                    supportEmail: "support@gymtank.com",
                    currency: "EGP",
                    timezone: "GMT+02:00",
                    maintenanceMode: false,
                    maxMembersPerGym: 500,
                    maxCoachesPerGym: 5,
                    maxStorageMB: 1024,
                    vatRate: 14.0,
                    gracePeriodDays: 3,
                    reminderDays: 3,
                }
            });
        }
        
        return settings;
    } catch (error) {
        console.error("Error fetching global settings", error);
        return null;
    }
}

export async function updateGlobalSettings(data: any) {
    try {
        const settings = await prisma.globalSettings.findFirst();
        
        if (settings) {
            await prisma.globalSettings.update({
                where: { id: settings.id },
                data: {
                    platformName: data.platformName,
                    supportEmail: data.supportEmail,
                    currency: data.currency,
                    timezone: data.timezone,
                    maintenanceMode: data.maintenanceMode,
                    maxMembersPerGym: parseInt(data.maxMembersPerGym),
                    maxCoachesPerGym: parseInt(data.maxCoachesPerGym),
                    maxStorageMB: parseInt(data.maxStorageMB),
                    vatRate: parseFloat(data.vatRate),
                    gracePeriodDays: parseInt(data.gracePeriodDays),
                    reminderDays: parseInt(data.reminderDays),
                }
            });
        } else {
            await prisma.globalSettings.create({
                data: {
                    platformName: data.platformName,
                    supportEmail: data.supportEmail,
                    currency: data.currency,
                    timezone: data.timezone,
                    maintenanceMode: data.maintenanceMode,
                    maxMembersPerGym: parseInt(data.maxMembersPerGym),
                    maxCoachesPerGym: parseInt(data.maxCoachesPerGym),
                    maxStorageMB: parseInt(data.maxStorageMB),
                    vatRate: parseFloat(data.vatRate),
                    gracePeriodDays: parseInt(data.gracePeriodDays),
                    reminderDays: parseInt(data.reminderDays),
                }
            });
        }
        
        revalidatePath("/admin/settings");
        revalidatePath("/admin/subscriptions"); // In case currency changed
        return { success: true };
    } catch (error) {
        console.error("Error updating global settings", error);
        return { success: false };
    }
}
