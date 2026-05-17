"use client";
// ** Sections
import Title from "./sections/Title";
import GymInfo from "./sections/GymInfo";
import LanguageInfo from "./sections/LanguageInfo";
import OwnerInfo from "./sections/OwnerInfo";
import SubType from "./sections/SubType";
import Support from "./sections/Support";
import { useState } from "react";
import { GymLite } from "@/types";

interface SettingProps {
  initialData: GymLite;
  initialSubscription: any;
}

export default function Setting({ initialData, initialSubscription }: SettingProps) {
  const [data] = useState<GymLite>({
    name: initialData?.name || "",
    specialty: initialData?.specialty || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    id: initialData?.id || "",
    ownerId: initialData?.ownerId || "",
    state: initialData?.state || "",
    systemLanguage: initialData?.systemLanguage || "",
    currency: initialData?.currency || "ر.س",
    capacity: initialData?.capacity || 100,
    memberSubscriptionTypes: initialData?.memberSubscriptionTypes || ["عادي", "بريميوم", "VIP"],
    memberSubscriptionPrices: initialData?.memberSubscriptionPrices || "{}",
    ownerEmail: initialData?.ownerEmail || "",
    ownerName: initialData?.ownerName || "",
  });

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
            memberSubscriptionPrices={data.memberSubscriptionPrices || "{}"}
            currency={data.currency || "ر.س"}
          />
          <LanguageInfo />
        </div>
        <div className="flex flex-col gap-8">
          <OwnerInfo ownerName={data.ownerName} ownerEmail={data.ownerEmail} />
          <SubType subscription={initialSubscription} />
          <Support />
        </div>
      </section>
    </main>
  );
}
