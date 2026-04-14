// ** Pages
import Subscribes from "@/pages/user/subscribes/Subscribes";
// ** Hooks && Tools
import { cookies } from "next/headers";
// ** Actions
import { getDashboardStats } from "@/actions/user/calc.actions";
import { getMembersListAction } from "@/actions/user/user.actions";


export default async function Page() {
    // ** Constants
    const userId = (await cookies()).get("gym_tank_token")?.value;



    // ** Data
    const { data } = await getMembersListAction(userId);
    const { members, active, expiringSoon } = await getDashboardStats(userId);



    return <Subscribes data={data} members={members} active={active} expiringSoon={expiringSoon} />
}