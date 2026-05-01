// ** Pages
import Members from "@/pages/user/members/Members";
// ** Hooks && Tools
import { cookies } from "next/headers";
// ** Actions
import { getDashboardStats } from "@/actions/user/calc.actions";
import { getMembersListAction } from "@/actions/user/user.actions";



export default async function Page() {
    // ** Constants
    const userId = (await cookies()).get("gym_tank_token")?.value;



    // ** Data
    const membersData = await getMembersListAction(userId);
    const { members, active, expired, presentNow } = await getDashboardStats(userId);



    return (
        <Members
            data={membersData}
            members={members}
            active={active}
            expired={expired}
            presentNow={presentNow}
        />
    );
}
