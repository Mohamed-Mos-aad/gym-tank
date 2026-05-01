// ** Components
import Badge from "@/components/ui/Badge";
// ** Assets
import { CircleAlert, CircleCheck, UsersRound, Zap, Activity } from "lucide-react";
// ** Interfaces
interface CardsProps {
    members: number;
    active: number;
    expired: number;
    presentNow: number;
    expiringSoon: number;
}


export default function Cards({ members, active, expired, presentNow, expiringSoon }: CardsProps) {
    return (
        <section className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total Members */}
            <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-6 text-right shadow-sm border border-neutral-100 hover:shadow-md transition-shadow sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
                    <UsersRound size={24} />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-neutral-500 mb-1">إجمالي الأعضاء</h2>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-neutral-900">{members}</span>
                        <Badge className="bg-brand-50 text-[10px] font-bold text-brand-500">+12%</Badge>
                    </div>
                </div>
            </div>

            {/* Active Subscriptions */}
            <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-6 text-right shadow-sm border border-neutral-100 hover:shadow-md transition-shadow sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                    <CircleCheck size={24} />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-neutral-500 mb-1">الاشتراكات النشطة</h2>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-neutral-900">{active}</span>
                        <Badge className="bg-emerald-50 text-[10px] font-bold text-emerald-500">مستقر</Badge>
                    </div>
                </div>
            </div>

            {/* Present Now */}
            <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-6 text-right shadow-sm border border-neutral-100 hover:shadow-md transition-shadow sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                    <Activity size={24} className="animate-pulse" />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-neutral-500 mb-1">الموجودين الآن</h2>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-neutral-900">{presentNow}</span>
                        <div className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></div>
                    </div>
                </div>
            </div>

            {/* Expiring Soon / Expired */}
            <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-6 text-right shadow-sm border border-neutral-100 hover:shadow-md transition-shadow sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <Zap size={24} />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-neutral-500 mb-1">تنتهي قريباً</h2>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-neutral-900">{expiringSoon}</span>
                        <Badge className="bg-orange-50 text-[10px] font-bold text-orange-500">تنبيه</Badge>
                    </div>
                </div>
            </div>
        </section>
    )
}