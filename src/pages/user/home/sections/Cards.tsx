// ** Components
import Badge from "@/components/ui/Badge";
// ** Assets
import { CircleAlert, CircleCheck, UsersRound } from "lucide-react";
// ** Interfaces
interface CardsProps{ 
    members: number;
    active: number;
    expired: number;
} 


export default function Cards({members, active, expired}:CardsProps) {
    return (
        <section className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                <Badge className="absolute top-8 left-8 bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">12% +</Badge>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10">
                    <UsersRound className="text-brand-500" />
                </div>
                <h2 className="text-[14px] font-medium text-neutral-900">إجمالي الأعضاء</h2>
                <p className="-mt-6 text-[36px] font-black text-brand-700">{members}</p>
            </div>

            <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                <Badge className="absolute top-8 left-8 bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">5.2% +</Badge>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ECFDF5]">
                    <CircleCheck className="text-[#059669]" />
                </div>
                <h2 className="text-[14px] font-medium text-neutral-900">الاشتراكات النشطة</h2>
                <p className="-mt-6 text-[36px] font-black text-brand-700">{active}</p>
            </div>

            <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-6 text-right shadow sm:col-span-2 sm:p-8 xl:col-span-1">
                <Badge className="absolute top-8 left-8 bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">2.4% -</Badge>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF7ED]">
                    <CircleAlert className="text-[#EA580C]" />
                </div>
                <h2 className="text-[14px] font-medium text-neutral-900">الاشتراكات المنتهية</h2>
                <p className="-mt-6 text-[36px] font-black text-brand-700">{expired}</p>
            </div>
        </section>
    )
}