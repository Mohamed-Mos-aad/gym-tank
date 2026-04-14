// ** Sections
import Title from "./sections/Title";
import Cards from "./sections/Cards";
import Table from "./sections/Table";
// ** Actions
import { getAttendanceListAction, getDashboardStats } from "../../../../actions/user.actions";



export default async function Members() {
    // ** States
    const { members, active, expired, presentNow } = await getDashboardStats();
    const data = await getAttendanceListAction();



    return (
        <main className="flex flex-col gap-6 lg:gap-8">
            <Title />
            <Cards members={members} active={active} expired={expired} presentNow={presentNow}/>
            <Table data={data}/>
        </main>
    );
}
