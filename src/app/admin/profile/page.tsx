import { getCurrentUserAction } from "@/actions/user.actions";
import AdminProfileForm from "./AdminProfileForm";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
    const user = await getCurrentUserAction();
    return <AdminProfileForm initialUser={user} />;
}
