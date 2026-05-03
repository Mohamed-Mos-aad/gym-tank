"use client";

import { ShieldCheck, Zap, Calendar } from "lucide-react";
import Link from "next/link";

interface SubTypeProps {
    subscription?: any;
}

export default function SubType({ subscription }: SubTypeProps) {
    const isActive = subscription?.status === "ACTIVE";
    const planName = subscription?.planName || "لا يوجد اشتراك";
    const endDate = subscription?.endDate 
        ? new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date(subscription.endDate)) 
        : null;

    return (
        <div 
            className="relative flex flex-col gap-4 rounded-3xl p-8 text-right shadow overflow-hidden"
            style={{ background: isActive ? "linear-gradient(135deg, #3525CD 0%, #1a0f8c 100%)" : "linear-gradient(135deg, #374151 0%, #1f2937 100%)" }}
        >
            <div className="flex items-center gap-2">
                {isActive ? <ShieldCheck size={16} className="text-white/60" /> : <Zap size={16} className="text-white/60" />}
                <h2 className="text-[11px] font-black text-white/60 uppercase tracking-wider">حالة اشتراك المنصة</h2>
            </div>
            
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-white">{planName}</h3>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full ${isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                    {isActive ? "نشط" : "غير نشط"}
                </span>
            </div>

            {endDate && (
                <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Calendar size={14} />
                    <p>ينتهي في {endDate}</p>
                </div>
            )}

            <Link 
                href="/user/billing" 
                className="w-full mt-2 text-center bg-white/15 hover:bg-white/25 text-white py-3 rounded-xl font-black text-sm transition-all"
            >
                {isActive ? "إدارة الاشتراك" : "اشترك الآن"}
            </Link>
        </div>
    )
}