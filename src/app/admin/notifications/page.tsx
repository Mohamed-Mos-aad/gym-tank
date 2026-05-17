import { getAdminNotifications } from "@/actions/notifications.actions";
import { getAdminUsers } from "@/actions/admin/admin.actions";
import AdminNotificationsClient from "./AdminNotificationsClient";

export const dynamic = "force-dynamic";

export default async function AdminNotificationsPage() {
    const [notifData, userData] = await Promise.all([
        getAdminNotifications(),
        getAdminUsers()
    ]);

    return (
        <AdminNotificationsClient 
            initialNotifications={notifData || []} 
            initialUsers={userData || []} 
        />
    );
}
