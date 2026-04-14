// ** Sections
import Title from "./sections/Title";
import Cards from "./sections/Cards";
import Table from "./sections/Table";
import Tips from "./sections/Tips";
// ** Actions
import { getDashboardStats, getMembersListAction } from "../../../../actions/user.actions";
// ** Hooks && Tools
import { cookies } from "next/headers";



export default async function Subscribes() {
// ** Hooks && Tools
    const userId = ( await cookies()).get("gym_tank_token" )?.value;


    
    const { data } = await getMembersListAction();
    const { members, active , expiringSoon } = await getDashboardStats(userId);



    return (
        <main className="flex flex-col gap-6 lg:gap-8">
            <Title />
            <Cards members={members} active={active} expiringSoon={expiringSoon}/>
            <Table data={data}/>
            <Tips />
        </main>
    );
}