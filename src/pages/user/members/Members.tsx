// ** Sections
import Title from "./sections/Title";
import Cards from "./sections/Cards";
import Table from "./sections/Table";
// **Interfaces
interface MembersProps {
    data: {
        data: any[];
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
    const safeData = data ?? {
        data: [],
        total: 0,
        page: 1,
        totalPages: 1,
    };

    return (
        <main className="flex flex-col gap-6 lg:gap-8">
            <Title data={safeData.data}/>
            <Cards members={members} active={active} expired={expired} presentNow={presentNow}/>
            <Table data={safeData}/>
        </main>
    );
}
