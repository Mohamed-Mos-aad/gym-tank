// ** Sections
import Title from "./sections/Title";
import Cards from "./sections/Cards";
import Table from "./sections/Table";
// **Interfaces
import { AttendanceWithMember } from "@/types";
interface MembersProps {
    data: {
        data: AttendanceWithMember[];
        total: number;
        page: number;
        totalPages: number;
    };
    members: number;
    active: number;
    expired: number;
    presentNow: number;
}



export default function Members({ data, members, active, expired, presentNow }:MembersProps) {
    return (
        <main className="flex flex-col gap-6 lg:gap-8">
            <Title />
            <Cards members={members} active={active} expired={expired} presentNow={presentNow}/>
            <Table data={data}/>
        </main>
    );
}
