import Setting from "@/pages/user/setting/Setting";
import { getGymAction } from "@/actions/user/gym.actions";
import { getUserAction } from "@/actions/user/user.actions";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const gymRes = await getGymAction();
    const userRes = await getUserAction(gymRes.ownerId);

    const activeSub = gymRes.subscriptions?.find((s: any) => s.status === "ACTIVE");

    const initialData = {
        ...gymRes,
        ownerName: userRes.name,
        ownerEmail: userRes.email,
    };

    return <Setting initialData={initialData} initialSubscription={activeSub} />
}