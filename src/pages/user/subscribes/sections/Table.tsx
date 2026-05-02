"use client";

import Badge from "@/components/ui/Badge";
import { ChevronLeft, ChevronRight, MoreHorizontal, Calendar, Zap, AlertTriangle, Search, Filter } from "lucide-react";
import { useState } from "react";
import RenewMemberModal from "@/pages/user/members/components/RenewMemberModal";
import Toast from "@/components/ui/Toast";

interface TableProps {
    data: any[];
}

export default function Table({ data }: TableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [isRenewOpen, setIsRenewOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

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

        if (status === "EXPIRED" || diffDays <= 0) {
            return {
                label: "منتهي",
                class: "bg-red-50 text-red-600 border-red-100",
                icon: <AlertTriangle size={12} />,
                type: "EXPIRED"
            };
        }
        if (diffDays <= 7) {
            return {
                label: `ينتهي خلال ${diffDays} يوم`,
                class: "bg-orange-50 text-orange-600 border-orange-100",
                icon: <Zap size={12} className="animate-pulse" />,
                type: "EXPIRING"
            };
        }
        return {
            label: "نشط",
            class: "bg-emerald-50 text-emerald-600 border-emerald-100",
            icon: null,
            type: "ACTIVE"
        };
    };

    const filteredData = data?.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             member.phone?.includes(searchTerm);
        
        const statusInfo = getStatusInfo(member.subscriptionStatus, member.endDate);
        const matchesFilter = filterStatus === "ALL" || statusInfo.type === filterStatus;

        return matchesSearch && matchesFilter;
    });

    return (
        <section className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-6 border-b border-neutral-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-black text-neutral-900">إدارة تجديد الاشتراكات</h2>
                    <p className="text-xs text-neutral-400 font-bold">متابعة مواعيد الانتهاء وتجديد العضويات</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative group flex-1 sm:w-64">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-500 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="بحث عن عضو..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-11 pr-11 pl-4 bg-neutral-50 border border-neutral-100 rounded-xl text-sm font-bold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/5 transition-all"
                        />
                    </div>
                    
                    <div className="flex bg-neutral-50 p-1 rounded-xl border border-neutral-100">
                        {["ALL", "ACTIVE", "EXPIRING", "EXPIRED"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                                    filterStatus === status 
                                    ? "bg-white text-brand-500 shadow-sm" 
                                    : "text-neutral-400 hover:text-neutral-600"
                                }`}
                            >
                                {status === "ALL" ? "الكل" : status === "ACTIVE" ? "نشط" : status === "EXPIRING" ? "قريباً" : "منتهي"}
                            </button>
                        ))}
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
                        {filteredData && filteredData.length > 0 ? filteredData.map((member) => {
                            const statusInfo = getStatusInfo(member.subscriptionStatus, member.endDate);
                            return (
                                <tr key={member.id} className="hover:bg-neutral-50/30 transition-colors group">
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
                                        <button 
                                            onClick={() => { setSelectedMember(member); setIsRenewOpen(true); }}
                                            className="bg-brand-500 text-white px-4 py-2 rounded-xl font-black text-[10px] hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/10 transform active:scale-95"
                                        >
                                            تجديد الآن
                                        </button>
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan={6} className="py-20 text-center text-neutral-400 font-bold">
                                    <div className="flex flex-col items-center gap-2">
                                        <Search size={40} className="text-neutral-100" />
                                        <span>لا توجد اشتراكات مطابقة للبحث</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedMember && (
                <RenewMemberModal 
                    isOpen={isRenewOpen}
                    onClose={() => { setIsRenewOpen(false); setSelectedMember(null); }}
                    member={selectedMember}
                />
            )}

            {toast && (
                <Toast 
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            
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