"use client";

import { useState } from "react";
import { 
    Building2, User, Phone, Mail, MapPin, 
    Calendar, CreditCard, CheckCircle2, 
    AlertCircle, Clock, ArrowLeft, Building,
    Users, ShieldCheck, Activity
} from "lucide-react";
import { approvePaymentRequest, updateGymStatus } from "@/actions/admin/admin.actions";
import { useRouter } from "next/navigation";

export default function AdminGymDetailsClient({ initialGym }: { initialGym: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date(date));
    };

    const handleApprovePayment = async (requestId: string) => {
        if (!confirm("هل أنت متأكد من استلام المبلغ وتفعيل الاشتراك؟")) return;
        
        setLoading(true);
        const result = await approvePaymentRequest(requestId);
        if (result.success) {
            alert("تم تفعيل الاشتراك بنجاح!");
            router.refresh();
        } else {
            alert("حدث خطأ أثناء التفعيل");
        }
        setLoading(false);
    };

    const handleUpdateStatus = async (status: string) => {
        if (!confirm(`هل أنت متأكد من تغيير حالة الجيم إلى ${status}؟`)) return;
        
        setLoading(true);
        // @ts-ignore
        const result = await updateGymStatus(initialGym.id, status);
        if (result.success) {
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Gym Info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Header Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center font-black text-3xl shadow-sm">
                            {initialGym.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-3xl font-black text-neutral-900">{initialGym.name}</h1>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    initialGym.status === 'APPROVED' ? 'bg-green-50 text-green-600' : 
                                    initialGym.status === 'PENDING' ? 'bg-orange-50 text-orange-600' : 
                                    'bg-red-50 text-red-600'
                                }`}>
                                    {initialGym.status === 'APPROVED' ? 'نشط' : initialGym.status === 'PENDING' ? 'قيد المراجعة' : 'مرفوض'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-neutral-500 font-bold">
                                <MapPin size={16} />
                                <span>{initialGym.address}, {initialGym.state}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        {initialGym.status === 'PENDING' && (
                            <>
                                <button 
                                    onClick={() => handleUpdateStatus('APPROVED')}
                                    className="flex-1 sm:flex-none bg-brand-500 text-white px-6 py-3 rounded-2xl font-black hover:bg-brand-700 transition-all"
                                >
                                    قبول الجيم
                                </button>
                                <button 
                                    onClick={() => handleUpdateStatus('REJECTED')}
                                    className="flex-1 sm:flex-none bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-black hover:bg-red-100 transition-all"
                                >
                                    رفض
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Owner Info */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <User size={20} />
                            </div>
                            <h3 className="text-lg font-black text-neutral-900">بيانات المالك</h3>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center py-3 border-b border-neutral-50">
                                <span className="text-neutral-500 font-bold">اسم المالك</span>
                                <span className="text-neutral-900 font-black">{initialGym.owner.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-neutral-50">
                                <span className="text-neutral-500 font-bold">البريد الإلكتروني</span>
                                <span className="text-neutral-900 font-black">{initialGym.owner.email}</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <span className="text-neutral-500 font-bold">رقم الهاتف</span>
                                <span className="text-neutral-900 font-black">{initialGym.phone || "غير مسجل"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                                <Activity size={20} />
                            </div>
                            <h3 className="text-lg font-black text-neutral-900">إحصائيات سريعة</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-neutral-50 rounded-2xl p-4 flex flex-col gap-1">
                                <span className="text-xs text-neutral-500 font-bold">إجمالي الأعضاء</span>
                                <span className="text-2xl font-black text-neutral-900">{initialGym._count.members}</span>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-4 flex flex-col gap-1">
                                <span className="text-xs text-neutral-500 font-bold">تاريخ التسجيل</span>
                                <span className="text-sm font-black text-neutral-900">{formatDate(initialGym.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Requests */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                <CreditCard size={20} />
                            </div>
                            <h3 className="text-lg font-black text-neutral-900">طلبات الدفع والاشتراك</h3>
                        </div>
                        <span className="text-xs font-bold text-neutral-500">مراجعة التحويلات الخارجية</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {initialGym.paymentRequests.length > 0 ? initialGym.paymentRequests.map((req: any) => (
                            <div key={req.id} className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-neutral-100 flex items-center justify-center text-brand-500 shrink-0">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-black text-neutral-900">{req.plan.name}</span>
                                            <span className="text-xs bg-brand-50 text-brand-500 px-2 py-0.5 rounded-full font-bold">
                                                {req.amount} EGP
                                            </span>
                                        </div>
                                        <div className="text-xs text-neutral-500 font-bold flex items-center gap-2">
                                            <Calendar size={12} />
                                            {formatDate(req.createdAt)}
                                            <span className="mx-1">•</span>
                                            <span className="text-neutral-700">الوسيلة: {req.method}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                    {req.status === 'PENDING' ? (
                                        <button 
                                            onClick={() => handleApprovePayment(req.id)}
                                            disabled={loading}
                                            className="bg-brand-500 text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-md shadow-brand-500/10 hover:bg-brand-700 transition-all flex items-center gap-2"
                                        >
                                            <CheckCircle2 size={16} />
                                            تأكيد استلام المبلغ
                                        </button>
                                    ) : (
                                        <span className={`flex items-center gap-1.5 text-sm font-black ${req.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'}`}>
                                            {req.status === 'APPROVED' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                            {req.status === 'APPROVED' ? 'تم التأكيد' : 'مرفوض'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                                <Clock size={40} className="mx-auto text-neutral-300 mb-4" />
                                <p className="text-neutral-500 font-bold">لا توجد طلبات دفع حالية لهذا الجيم</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column: History & Quick Actions */}
            <div className="flex flex-col gap-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                    <h3 className="text-lg font-black text-neutral-900 mb-6">سجل الاشتراكات</h3>
                    <div className="flex flex-col gap-4">
                        {initialGym.subscriptions.length > 0 ? initialGym.subscriptions.map((sub: any) => (
                            <div key={sub.id} className="flex gap-3 items-start">
                                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${sub.status === 'ACTIVE' ? 'bg-green-500' : 'bg-neutral-300'}`}></div>
                                <div>
                                    <p className="text-sm font-black text-neutral-900">{sub.planName}</p>
                                    <p className="text-[10px] text-neutral-500 font-bold">
                                        ينتهي في {sub.endDate ? formatDate(sub.endDate) : "غير محدد"}
                                    </p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-sm text-neutral-500">لا يوجد سجل اشتراكات</p>
                        )}
                    </div>
                </div>

                <div className="bg-neutral-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Building size={120} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-4">ملاحظات الإدارة</h3>
                        <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                            تأكد دائماً من مراجعة مستندات النادي والتحقق من هوية المالك قبل تفعيل أي اشتراك مدفوع خارجياً.
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-brand-400">
                                <ShieldCheck size={14} />
                                تم التحقق من البريد الإلكتروني
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                                <Clock size={14} />
                                قيد مراجعة النشاط الميداني
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
