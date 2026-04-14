// ** Sections
import Title from "./sections/Title";
import Cards from "./sections/Cards";
import Table from "./sections/Table";
import Tips from "./sections/Tips";
// ** Actions
import { getDashboardStats, getMembersListAction } from "../../../../actions/user.actions";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


export default async function Subscribes() {
    const { data } = await getMembersListAction();
    const { members, active , expiringSoon } = await getDashboardStats();



    console.log(data)
    return (
        <main className="flex flex-col gap-6 lg:gap-8">
            <Title />
            <Cards members={members} active={active} expiringSoon={expiringSoon}/>
            <Table data={data}/>
            <Tips />
        </main>
    );
}