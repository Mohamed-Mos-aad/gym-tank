// ** Pages
import Members from "@/pages/user/members/Members";
// ** Hooks && Tools
import { cookies } from "next/headers";
// ** Actions
import { getDashboardStats } from "@/actions/user/calc.actions";
import { getAttendanceListAction } from "@/actions/user/attendance.actions";



export default async function Page() {
    // ** Constants
    const userId = (await cookies()).get("gym_tank_token")?.value;



    // ** Data
    const data = await getAttendanceListAction(userId) ?? {
        data: [],
        total: 0,
        page: 1,
        totalPages: 1,
    };
    const { members, active, expired, presentNow } = await getDashboardStats(userId);



    return (
        <Members
            data={data}
            members={members}
            active={active}
            expired={expired}
            presentNow={presentNow}
        />
    );
}
