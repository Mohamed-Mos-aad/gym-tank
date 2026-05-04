"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, User, Calendar, Phone, CreditCard, LogIn, LogOut, CheckCircle2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import CustomSelect from "@/components/ui/Select";
import Toast from "@/components/ui/Toast";
import MemberActions from "../components/MemberActions";
import EditMemberModal from "../components/EditMemberModal";
import RenewMemberModal from "../components/RenewMemberModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { createAttendanceAction, createCheckoutAction } from "@/actions/user/attendance.actions";
import { deleteMemberAction } from "@/actions/user/user.actions";

interface TableProps {
    data: {
        data: any[];
    };
}

export default function Table({ data }: TableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    
    const members = data?.data || [];
    const [isProcessing, setIsProcessing] = useState<string | null>(null);
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isRenewOpen, setIsRenewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
    };

    const filteredMembers = members.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             m.phone.includes(searchTerm);
        const matchesStatus = statusFilter === "ALL" || m.subscriptionStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleCheckIn = async (memberId: string) => {
        setIsProcessing(memberId);
        try {
            await createAttendanceAction(memberId);
            showToast("تم تسجيل الدخول بنجاح", "success");
            setTimeout(() => window.location.reload(), 1500);
        } catch (error: any) {
            showToast(error.message || "حدث خطأ", "error");
        }
        setIsProcessing(null);
    };

    const handleCheckOut = async (memberId: string) => {
        setIsProcessing(memberId);
        try {
            await createCheckoutAction(memberId);
            showToast("تم تسجيل الانصراف بنجاح", "success");
            setTimeout(() => window.location.reload(), 1500);
        } catch (error: any) {
            showToast(error.message || "حدث خطأ", "error");
        }
        setIsProcessing(null);
    };

    const handleDelete = async () => {
        if (!selectedMember) return;
        setIsProcessing(selectedMember.id);
        try {
            await deleteMemberAction(selectedMember.id);
            showToast("تم حذف العضو بنجاح", "success");
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            showToast("حدث خطأ أثناء الحذف", "error");
        } finally {
            setIsDeleteOpen(false);
            setIsProcessing(null);
        }
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
                    <CustomSelect 
                        value={statusFilter}
                        onChange={(val) => setStatusFilter(val)}
                        options={[
                            { label: "كل الأعضاء", value: "ALL" },
                            { label: "نشط فقط", value: "ACTIVE" },
                            { label: "منتهي فقط", value: "EXPIRED" }
                        ]}
                        icon={<Filter size={16} />}
                    />
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
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-black text-neutral-900">{member.name}</span>
                                                        {member.attendances?.[0] && !member.attendances[0].checkOut && (
                                                            <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                                                <span className="relative flex h-2 w-2">
                                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                                                </span>
                                                                <span className="text-[10px] font-bold text-emerald-600">متواجد</span>
                                                            </div>
                                                        )}
                                                    </div>
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
                                            <div className="flex justify-center items-center gap-2">
                                                {/* Check-in Logic */}
                                                {(!member.attendances?.[0]) ? (
                                                    <button 
                                                        onClick={() => handleCheckIn(member.id)}
                                                        disabled={isProcessing === member.id || member.subscriptionStatus === "EXPIRED"}
                                                        title="تسجيل دخول"
                                                        className="cursor-pointer p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all disabled:opacity-30"
                                                    >
                                                        <LogIn size={18} />
                                                    </button>
                                                ) : (!member.attendances[0].checkOut) ? (
                                                    /* Check-out Logic */
                                                    <button 
                                                        onClick={() => handleCheckOut(member.id)}
                                                        disabled={isProcessing === member.id}
                                                        title="تسجيل انصراف"
                                                        className="cursor-pointer p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-all disabled:opacity-30"
                                                    >
                                                        <LogOut size={18} />
                                                    </button>
                                                ) : (
                                                    /* Done for today */
                                                    <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] bg-emerald-50/50 px-2 py-1 rounded-lg border border-emerald-100/50">
                                                        <CheckCircle2 size={14} />
                                                        <span>أتم اليوم</span>
                                                    </div>
                                                )}

                                                <MemberActions 
                                                    member={member} 
                                                    onEdit={(m) => { setSelectedMember(m); setIsEditOpen(true); }}
                                                    onRenew={(m) => { setSelectedMember(m); setIsRenewOpen(true); }}
                                                    onDelete={(m) => { setSelectedMember(m); setIsDeleteOpen(true); }}
                                                />
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

            {selectedMember && (
                <>
                    <EditMemberModal 
                        member={selectedMember} 
                        isOpen={isEditOpen} 
                        onClose={() => { setIsEditOpen(false); setSelectedMember(null); }} 
                    />
                    <RenewMemberModal 
                        member={selectedMember} 
                        isOpen={isRenewOpen} 
                        onClose={() => { setIsRenewOpen(false); setSelectedMember(null); }} 
                    />
                    <DeleteConfirmModal 
                        isOpen={isDeleteOpen}
                        onClose={() => { setIsDeleteOpen(false); setSelectedMember(null); }}
                        onConfirm={handleDelete}
                        itemName={selectedMember.name}
                        loading={isProcessing === selectedMember.id}
                    />
                </>
            )}

            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}
        </section>
    );
}
