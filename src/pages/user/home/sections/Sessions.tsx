"use client";

import { AlertTriangle, Clock, Phone } from "lucide-react";

interface SessionsProps {
    data?: any[];
}

export default function Sessions({ data }: SessionsProps) {
    const formatDate = (date: any) => {
        if (!date) return "---";
        return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'short' }).format(new Date(date));
    };

    return (
        <div className="relative flex flex-col gap-6 rounded-[32px] bg-white p-8 text-right shadow-sm border border-neutral-100 h-full">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-neutral-900 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-orange-500" />
                    تنبيهات التجديد
                </h2>
                <span className="text-[10px] font-bold text-neutral-400 bg-neutral-50 px-2 py-1 rounded-lg border border-neutral-100">قريباً</span>
            </div>

            <ul className="flex h-full w-full flex-col gap-3">
                {data && data.length > 0 ? (
                    data.map((member) => (
                        <li key={member.id} className="flex w-full items-center justify-between gap-4 rounded-2xl bg-neutral-50 p-4 border border-neutral-100 hover:border-brand-200 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center font-black text-brand-600">
                                    {member.name.substring(0, 1)}
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-900">{member.name}</h3>
                                    <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-bold">
                                        <Phone size={10} />
                                        {member.phone}
                                    </div>
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="flex items-center gap-1 text-orange-600 font-black text-xs">
                                    <Clock size={12} />
                                    {formatDate(member.endDate)}
                                </div>
                                <span className="text-[9px] text-neutral-400 font-bold uppercase">ينتهي في</span>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4">
                            <Clock size={32} />
                        </div>
                        <p className="text-sm font-bold text-neutral-500">لا يوجد اشتراكات تنتهي قريباً</p>
                    </div>
                )}
            </ul>
        </div>
    )
}