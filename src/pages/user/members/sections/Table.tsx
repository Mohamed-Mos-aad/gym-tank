"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, User, Calendar, Phone, CreditCard, LogIn, LogOut } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { createAttendanceAction, createCheckoutAction } from "@/actions/user/attendance.actions";

interface TableProps {
    data: {
        data: any[];
    };
}

export default function Table({ data }: TableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    
    const members = data?.data || [];
    const [isProcessing, setIsProcessing] = useState<string | null>(null);

    const filteredMembers = members.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.phone.includes(searchTerm)
    );

    const handleCheckIn = async (memberId: string) => {
        setIsProcessing(memberId);
        try {
            await createAttendanceAction(memberId);
            alert("تم تسجيل الدخول بنجاح");
            window.location.reload();
        } catch (error: any) {
            alert(error.message || "حدث خطأ");
        }
        setIsProcessing(null);
    };

    const handleCheckOut = async (memberId: string) => {
        setIsProcessing(memberId);
        try {
            await createCheckoutAction(memberId);
            alert("تم تسجيل الانصراف بنجاح");
            window.location.reload();
        } catch (error: any) {
            alert(error.message || "حدث خطأ");
        }
        setIsProcessing(null);
    };

    const formatDate = (date: any) => {
        if (!date) return "---";
        return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' }).format(new Date(date));
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100">نشط</Badge>;
            case "EXPIRED":
                return <Badge className="bg-red-50 text-red-600 border border-red-100">منتهي</Badge>;
            case "PENDING":
                return <Badge className="bg-orange-50 text-orange-600 border border-orange-100">معلق</Badge>;
            default:
                return <Badge className="bg-neutral-50 text-neutral-600">{status}</Badge>;
        }
    };

    return (
        <section className="flex flex-col gap-6">
            {/* Search & Filter Header */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="ابحث باسم العضو أو رقم الهاتف..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-2xl px-12 text-sm font-bold focus:outline-none focus:border-brand-500 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-neutral-50 text-neutral-600 font-bold text-sm hover:bg-neutral-100 transition-colors border border-neutral-100">
                        <Filter size={16} />
                        تصفية
                    </button>
                    <button className="flex-1 md:flex-none bg-brand-500 text-white h-12 px-8 rounded-2xl font-black text-sm hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20">
                        إضافة عضو جديد
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm">
                        <thead className="bg-neutral-50/50 text-neutral-500 font-bold border-b border-neutral-100">
                            <tr>
                                <th className="py-5 px-6">العضو</th>
                                <th className="py-5 px-6">بيانات التواصل</th>
                                <th className="py-5 px-6">نوع الاشتراك</th>
                                <th className="py-5 px-6">تاريخ الانتهاء</th>
                                <th className="py-5 px-6 text-center">الحالة</th>
                                <th className="py-5 px-6 text-center">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                            {filteredMembers.length > 0 ? (
                                filteredMembers.map((member) => (
                                    <tr key={member.id} className="hover:bg-neutral-50/30 transition-colors">
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center font-black">
                                                    {member.name.substring(0, 1)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-neutral-900">{member.name}</span>
                                                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">ID: {member.id.substring(0, 8)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-neutral-700 font-bold">
                                                    <Phone size={14} className="text-neutral-400" />
                                                    {member.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 font-bold text-neutral-700">
                                            <div className="flex items-center gap-2">
                                                <CreditCard size={14} className="text-brand-500" />
                                                {member.subscriptionType || "---"}
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 font-bold text-neutral-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-neutral-400" />
                                                {formatDate(member.endDate)}
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 text-center">
                                            {getStatusBadge(member.subscriptionStatus || "ACTIVE")}
                                        </td>
                                        <td className="py-5 px-6 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button 
                                                    onClick={() => handleCheckIn(member.id)}
                                                    disabled={isProcessing === member.id || member.subscriptionStatus === "EXPIRED"}
                                                    title="تسجيل دخول"
                                                    className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-30"
                                                >
                                                    <LogIn size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleCheckOut(member.id)}
                                                    disabled={isProcessing === member.id}
                                                    title="تسجيل انصراف"
                                                    className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors disabled:opacity-30"
                                                >
                                                    <LogOut size={18} />
                                                </button>
                                                <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                                                    <MoreVertical size={18} className="text-neutral-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center text-neutral-400 font-bold">
                                        لا يوجد أعضاء مطابقين للبحث.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
