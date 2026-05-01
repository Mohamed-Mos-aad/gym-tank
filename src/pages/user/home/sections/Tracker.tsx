"use client";

// ** Hooks && Tools
import type { CSSProperties } from "react";
import { Activity, Users } from "lucide-react";

interface TrackerProps {
    presentNow: number;
}

export default function Tracker({ presentNow }: TrackerProps) {
    // ** Constants
    const maxCapacity = 100; // This could be dynamic later
    const occupancyRate = Math.min(Math.round((presentNow / maxCapacity) * 100), 100);
    const progressStyle = { "--progress": occupancyRate } as CSSProperties;

    return (
        <div className="relative flex flex-col items-center gap-6 rounded-[32px] bg-white p-8 text-right shadow-sm border border-neutral-100 h-full">
            <div className="w-full flex items-center justify-between">
                <h2 className="text-lg font-black text-neutral-900 flex items-center gap-2">
                    <Activity size={18} className="text-brand-500" />
                    إشغال الصالة حاليًا
                </h2>
                <div className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>

            <div className="progress flex h-52 w-52 items-center justify-center rounded-full text-center shadow-inner bg-neutral-50 relative" style={progressStyle}>
                <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-white shadow-sm border border-neutral-50">
                    <h3 className="text-[42px] font-black text-brand-700 leading-none">{occupancyRate}%</h3>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-2">معدل الإشغال</span>
                </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-4">
                <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-4 flex flex-col items-center justify-center text-center">
                    <h4 className="text-[10px] font-bold text-neutral-400 uppercase mb-1">المتواجدون</h4>
                    <span className="text-xl font-black text-brand-500 flex items-center gap-2">
                        <Users size={16} />
                        {presentNow}
                    </span>
                </div>
                <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-4 flex flex-col items-center justify-center text-center">
                    <h4 className="text-[10px] font-bold text-neutral-400 uppercase mb-1">السعة القصوى</h4>
                    <span className="text-xl font-black text-neutral-900">{maxCapacity}</span>
                </div>
            </div>
        </div>
    )
}