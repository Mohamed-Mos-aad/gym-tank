import { Users, CheckCircle2, Clock, Wallet } from "lucide-react";

interface CardsProps {
    members: number;
    active: number;
    expiringSoon: number;
    revenue?: number;
    currency?: string;
}

export default function Cards({ members, active, expiringSoon, revenue = 0, currency = "ر.س" }: CardsProps) {
    return (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total Members */}
            <div className="relative group overflow-hidden bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-100 transition-all hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1">
                <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-500 group-hover:scale-110 transition-transform">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-neutral-400 mb-1">إجمالي المشتركين</p>
                        <h3 className="text-3xl font-black text-neutral-900 leading-none">{members}</h3>
                    </div>
                </div>
                <div className="absolute -right-4 -bottom-4 text-neutral-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
                    <Users size={120} />
                </div>
            </div>

            {/* Active Subscriptions */}
            <div className="relative group overflow-hidden bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-100 transition-all hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
                <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-neutral-400 mb-1">الاشتراكات النشطة</p>
                        <h3 className="text-3xl font-black text-neutral-900 leading-none">{active}</h3>
                    </div>
                </div>
                <div className="absolute -right-4 -bottom-4 text-neutral-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
                    <CheckCircle2 size={120} />
                </div>
            </div>

            {/* Expiring Soon */}
            <div className="relative group overflow-hidden bg-white rounded-[2rem] p-6 shadow-sm border border-neutral-100 transition-all hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1">
                <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                        <Clock size={24} className="animate-pulse" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-neutral-400 mb-1">تجديدات قريبة (٧ أيام)</p>
                        <h3 className="text-3xl font-black text-neutral-900 leading-none">{expiringSoon}</h3>
                    </div>
                </div>
                <div className="absolute -right-4 -bottom-4 text-neutral-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
                    <Clock size={120} />
                </div>
            </div>

            {/* Monthly Revenue (Placeholder) */}
            <div className="relative group overflow-hidden bg-brand-500 rounded-[2rem] p-6 shadow-xl shadow-brand-500/20 transition-all hover:-translate-y-1">
                <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
                        <Wallet size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-brand-50 mb-1">الإيرادات الشهرية المتوقعة</p>
                        <h3 className="text-3xl font-black text-white leading-none drop-shadow-sm">
                            {revenue.toLocaleString()}
                            <span className="text-xs font-bold mr-1 opacity-80 italic">{currency}</span>
                        </h3>
                    </div>
                </div>
                <div className="absolute -right-4 -bottom-4 text-white opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <Wallet size={120} />
                </div>
            </div>
        </section>
    );
}