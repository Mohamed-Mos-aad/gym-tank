// ** Pages
import Home from "@/pages/user/home/Home";
// ** Hooks && Tools
import { cookies } from "next/headers";
// ** Actions
import { getDashboardStats } from "@/actions/user/calc.actions";



export default async function page() {
    // ** Constants
    const userId = (await cookies()).get("gym_tank_token")?.value;



    // ** Data
    const { members, active, expired } = await getDashboardStats(userId);



    return <Home members={members} active={active} expired={expired} />
}
