"use client";
// ** Sections
import Title from "./sections/Title";
import GymInfo from "./sections/GymInfo";
import LanguageInfo from "./sections/LanguageInfo";
import OwnerInfo from "./sections/OwnerInfo";
import SubType from "./sections/SubType";
import Support from "./sections/Support";
// ** ACtions
import { getGymAction } from "@/actions/user/gym.actions";
import { useEffect, useState } from "react";
import { GymLite } from "@/types";
import { getUserAction } from "@/actions/user/user.actions";

export default function Setting() {
  // ** States
  const [data, setData] = useState<GymLite>({
    name: "",
    specialty: "",
    phone: "",
    email: "",
    address: "",
    id: "",
    ownerId: "",
    state: "",
    systemLanguage: "",
    capacity: 100,
    memberSubscriptionTypes: ["عادي", "بريميوم", "VIP"],
    ownerEmail: "",
    ownerName: "",
  });
  const [subscription, setSubscription] = useState<any>(null);

  // ** Handlers
  const getDataHandler = async () => {
    try {
      const gymRes = await getGymAction();
      const userRes = await getUserAction(gymRes.ownerId);
      setData({
        ...gymRes,
        ownerName: userRes.name,
        ownerEmail: userRes.email,
      });
      // Find active subscription
      const activeSub = gymRes.subscriptions?.find((s: any) => s.status === "ACTIVE");
      setSubscription(activeSub || null);
    } catch (error) {
      console.log(error);
    }
  };

  // ** UseEffect
  useEffect(() => {
    const fetchDataHandler = async () => {
      await getDataHandler();
    };

    fetchDataHandler();
  }, []);

  return (
    <main className="flex flex-col gap-6 lg:gap-8">
      <Title />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <GymInfo
            name={data.name}
            specialty={data.specialty}
            phone={data.phone}
            email={data.email}
            address={data.address}
            capacity={data.capacity || 100}
            memberSubscriptionTypes={data.memberSubscriptionTypes || ["عادي", "بريميوم", "VIP"]}
          />
          <LanguageInfo />
        </div>
        <div className="flex flex-col gap-8">
          <OwnerInfo ownerName={data.ownerName} ownerEmail={data.ownerEmail} />
          <SubType subscription={subscription} />
          <Support />
        </div>
      </section>
    </main>
  );
}
