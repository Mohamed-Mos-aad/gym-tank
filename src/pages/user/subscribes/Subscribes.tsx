// ** Sections
import Title from "./sections/Title";
import Cards from "./sections/Cards";
import Table from "./sections/Table";
import Tips from "./sections/Tips";
// ** Interfaces
import { MemberLite } from "@/types";
interface SubscribesProps {
    data: MemberLite[],
    members: number;
    active: number;
    expiringSoon: number;
}


export default function Subscribes({data, members, active, expiringSoon}:SubscribesProps) {
  return (
    <main className="flex flex-col gap-6 lg:gap-8">
      <Title />
      <Cards members={members} active={active} expiringSoon={expiringSoon} />
      <Table data={data} />
      <Tips data={data} />
    </main>
  );
}
