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
    memberSubscriptionPrices?: string | null;
    currency?: string;
}


export default function Subscribes({data, members, active, expiringSoon, memberSubscriptionPrices, currency = "ر.س"}:SubscribesProps) {
  let revenue = 0;
  try {
      const priceMap = JSON.parse(memberSubscriptionPrices || "{}");
      data.forEach(m => {
          if (m.subscriptionStatus === "ACTIVE" && m.subscriptionType) {
              const price = priceMap[m.subscriptionType] || 0;
              revenue += price;
          }
      });
  } catch (e) {}

  return (
    <main className="flex flex-col gap-6 lg:gap-8">
      <Title />
      <Cards members={members} active={active} expiringSoon={expiringSoon} revenue={revenue} currency={currency} />
      <Table data={data} />
      <Tips data={data} />
    </main>
  );
}
