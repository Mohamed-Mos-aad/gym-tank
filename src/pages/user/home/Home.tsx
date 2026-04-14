// ** Sections
import Welcome from "./sections/Welcome";
import Cards from "./sections/Cards";
import Logs from "./sections/Logs";
import Tips from "./sections/Tips";
import Sessions from "./sections/Sessions";
import Tracker from "./sections/Tracker";
// ** Actions
import { getDashboardStats } from "../../../../actions/user.actions";
// ** Hooks && Tools
import { cookies } from "next/headers";



export default async function Home() {
    // ** Hooks && Tools
    const userId = ( await cookies()).get("gym_tank_token" )?.value;


    
    // ** States
    const { members, active, expired } = await getDashboardStats(userId);


    
    return (
        <main className="flex flex-col gap-6 lg:gap-8">
            <Welcome />
            <Cards members={members} active={active} expired={expired}/>
            <section className="grid gap-6 xl:grid-cols-3 xl:gap-8">
                <Logs />
                <Tips />
            </section>
            <section className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                <Sessions />
                <Tracker />                
            </section>
        </main>
    );
}
