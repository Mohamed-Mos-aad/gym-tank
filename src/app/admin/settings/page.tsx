import { getGlobalSettings } from "@/actions/admin/settings.actions";
import AdminSettingsForm from "./AdminSettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
    const settings = await getGlobalSettings();

    const initialData = settings
        ? {
              platformName: settings.platformName,
              supportEmail: settings.supportEmail || "",
              currency: settings.currency,
              timezone: settings.timezone,
              maintenanceMode: settings.maintenanceMode,
              maxMembersPerGym: settings.maxMembersPerGym,
              maxCoachesPerGym: settings.maxCoachesPerGym,
              maxStorageMB: settings.maxStorageMB,
              vatRate: settings.vatRate,
              gracePeriodDays: settings.gracePeriodDays,
              reminderDays: settings.reminderDays,
              smtpHost: settings.smtpHost || "",
              smtpPort: settings.smtpPort || 587,
              smtpUser: settings.smtpUser || "",
              smtpEncryption: settings.smtpEncryption || "TLS"
          }
        : {
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
              smtpHost: "",
              smtpPort: 587,
              smtpUser: "",
              smtpEncryption: "TLS"
          };

    return <AdminSettingsForm initialData={initialData} />;
}
