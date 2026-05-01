"use client";

import Badge from "@/components/ui/Badge";
import { ChevronLeft, ChevronRight, MoreHorizontal, Calendar, Zap, AlertTriangle } from "lucide-react";

interface TableProps {
    data: any[];
}

export default function Table({ data }: TableProps) {
    const formatDate = (date: any) => {
        if (!date) return "---";
        const d = new Date(date);
        return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' }).format(d);
    };

    const getStatusInfo = (status: string, endDate: any) => {
        const now = new Date();
        const end = new Date(endDate);
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (status === "EXPIRED" || diffDays < 0) {
            return {
                label: "منتهي",
                class: "bg-red-50 text-red-600 border-red-100",
                icon: <AlertTriangle size={12} />
            };
        }
        if (diffDays <= 7) {
            return {
                label: `ينتهي خلال ${diffDays} يوم`,
                class: "bg-orange-50 text-orange-600 border-orange-100",
                icon: <Zap size={12} className="animate-pulse" />
            };
        }
        return {
            label: "نشط",
            class: "bg-emerald-50 text-emerald-600 border-emerald-100",
            icon: null
        };
    };

    return (
        <section className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-6 border-b border-neutral-50 flex justify-between items-center">
                <h2 className="text-lg font-black text-neutral-900">إدارة تجديد الاشتراكات</h2>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> نشط
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span> ينتهي قريباً
                    </div>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                    <thead>
                        <tr className="bg-neutral-50/50 text-neutral-500 font-bold border-b border-neutral-100">
                            <th className="py-4 px-6">المشترك</th>
                            <th className="py-4 px-6">الباقة</th>
                            <th className="py-4 px-6 text-center">تاريخ البدء</th>
                            <th className="py-4 px-6 text-center">تاريخ الانتهاء</th>
                            <th className="py-4 px-6 text-center">الحالة</th>
                            <th className="py-4 px-6 text-center">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                        {data && data.length > 0 ? data.map((member) => {
                            const statusInfo = getStatusInfo(member.subscriptionStatus, member.endDate);
                            return (
                                <tr key={member.id} className="hover:bg-neutral-50/30 transition-colors">
                                    <td className="py-4 px-6 font-black text-neutral-900">{member.name}</td>
                                    <td className="py-4 px-6">
                                        <Badge className="bg-brand-50 text-brand-600 border-brand-100 font-bold">
                                            {member.subscriptionType || "أساسية"}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-6 text-center text-neutral-500 font-bold">
                                        {formatDate(member.startDate)}
                                    </td>
                                    <td className="py-4 px-6 text-center text-neutral-700 font-black">
                                        {formatDate(member.endDate)}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${statusInfo.class}`}>
                                            {statusInfo.icon}
                                            {statusInfo.label}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button className="text-brand-500 font-bold text-xs hover:underline">
                                            تجديد الآن
                                        </button>
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan={6} className="py-20 text-center text-neutral-400 font-bold">لا توجد اشتراكات مسجلة</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="p-6 border-t border-neutral-50 flex justify-between items-center bg-neutral-50/30">
                <span className="text-xs text-neutral-500 font-bold">عرض {data?.length || 0} من إجمالي المشتركين</span>
                <div className="flex gap-2">
                    <button className="p-2 rounded-xl border border-neutral-200 hover:bg-white transition-colors disabled:opacity-50">
                        <ChevronRight size={16} />
                    </button>
                    <button className="p-2 rounded-xl border border-neutral-200 hover:bg-white transition-colors disabled:opacity-50">
                        <ChevronLeft size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}