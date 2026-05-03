"use client";

import { useState } from "react";
import { Check, Zap, CreditCard, Clock, X, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { createPaymentRequestAction } from "@/actions/user/gym.actions";
import Toast from "@/components/ui/Toast";
import CustomSelect from "@/components/ui/Select";

type Plan = any;

export default function UserBillingClient({ plans, gymId, currency, pendingRequests }: { 
    plans: Plan[], 
    gymId: string, 
    currency: string,
    pendingRequests: any[]
}) {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [method, setMethod] = useState("InstaPay");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlan) return;
        
        setIsSubmitting(true);
        try {
            await createPaymentRequestAction(selectedPlan.id, method, selectedPlan.price, notes);
            setToast({ message: "تم إرسال طلب التفعيل بنجاح، سيقوم الأدمن بمراجعته خلال 24 ساعة.", type: "success" });
            setIsModalOpen(false);
            setTimeout(() => window.location.reload(), 2000);
        } catch (error) {
            setToast({ message: "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.", type: "error" });
        }
        setIsSubmitting(false);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div 
                        key={plan.id} 
                        className={`bg-white rounded-3xl p-8 border-2 transition-all flex flex-col ${plan.isPopular ? 'border-brand-500 shadow-lg' : 'border-neutral-100 shadow-sm'}`}
                    >
                        {plan.isPopular && (
                            <div className="bg-brand-500 text-white text-[10px] font-black px-3 py-1 rounded-full w-fit mb-4 flex items-center gap-1">
                                <Zap size={10} /> الأكثر طلباً
                            </div>
                        )}
                        <h3 className="text-xl font-black text-neutral-900 mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-3xl font-black text-brand-500">{currency} {plan.price}</span>
                            <span className="text-xs text-neutral-500">/ شهرياً</span>
                        </div>
                        
                        <div className="flex flex-col gap-3 mb-8 flex-1">
                            {plan.features.map((feature: string, i: number) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                                    <Check size={16} className="text-brand-500 mt-0.5 shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={() => { setSelectedPlan(plan); setIsModalOpen(true); }}
                            className={`w-full py-4 rounded-2xl font-black transition-all ${plan.isPopular ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20 hover:bg-brand-700' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
                        >
                            اطلب التفعيل الآن
                        </button>
                    </div>
                ))}
            </div>

            {/* Requests History - show all */}
            {pendingRequests.length > 0 && (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                    <h3 className="text-lg font-black text-neutral-900 mb-6">سجل طلبات التفعيل</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right text-sm">
                            <thead>
                                <tr className="text-neutral-500 border-b border-neutral-100">
                                    <th className="py-3 px-4">الباقة</th>
                                    <th className="py-3 px-4 text-center">المبلغ</th>
                                    <th className="py-3 px-4 text-center">الوسيلة</th>
                                    <th className="py-3 px-4 text-center">الحالة</th>
                                    <th className="py-3 px-4 text-center">التاريخ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingRequests.map((req) => (
                                    <tr key={req.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/30">
                                        <td className="py-4 px-4 font-bold text-neutral-900">{req.plan?.name || "باقة مخصصة"}</td>
                                        <td className="py-4 px-4 text-center font-bold text-brand-500">{currency} {req.amount}</td>
                                        <td className="py-4 px-4 text-center font-bold text-neutral-600">{req.method}</td>
                                        <td className="py-4 px-4 text-center">
                                            {req.status === "APPROVED" ? (
                                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold">
                                                    <CheckCircle2 size={10} /> مقبول
                                                </span>
                                            ) : req.status === "REJECTED" ? (
                                                <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold">
                                                    <XCircle size={10} /> مرفوض
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold">
                                                    <AlertCircle size={10} /> قيد المراجعة
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 text-center text-neutral-400">
                                            {new Intl.DateTimeFormat('ar-EG').format(new Date(req.createdAt))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-neutral-100 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-neutral-50 bg-neutral-50/50 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-neutral-900">تفعيل باقة {selectedPlan?.name}</h2>
                                <p className="text-sm text-neutral-500 mt-1">قم بتحويل المبلغ وإدخال بيانات التحويل للمراجعة.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-neutral-100">
                                <X size={20} className="text-neutral-400" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleRequest} className="p-8 flex flex-col gap-6">
                            <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100">
                                <div className="flex items-center gap-3 text-brand-700 font-bold mb-2">
                                    <CreditCard size={18} />
                                    <span>بيانات التحويل المتاحة</span>
                                </div>
                                <p className="text-xs text-brand-600 leading-relaxed">
                                    يمكنك التحويل عبر **InstaPay** على العنوان: `gymtank@instapay` 
                                    أو عبر **Vodafone Cash** على الرقم: `01012345678`.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-neutral-700">وسيلة التحويل</label>
                                <CustomSelect
                                    value={method}
                                    onChange={(val) => setMethod(val)}
                                    options={[
                                        { label: "انستا باي (InstaPay)", value: "InstaPay" },
                                        { label: "فودافون كاش", value: "Vodafone Cash" },
                                        { label: "تحويل بنكي", value: "Bank Transfer" },
                                    ]}
                                    icon={<CreditCard size={16} />}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-neutral-700">ملاحظات (رقم المحفظة أو اسم المحول)</label>
                                <textarea 
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full h-24 bg-neutral-50 border border-neutral-100 rounded-xl p-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                                    placeholder="اكتب هنا بيانات التحويل للتأكد من طلبك..."
                                />
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-brand-500 text-white h-14 rounded-2xl font-black shadow-lg shadow-brand-500/20 hover:bg-brand-700 transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? "جاري الإرسال..." : "إرسال طلب التفعيل"}
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-neutral-100 text-neutral-700 h-14 rounded-2xl font-black hover:bg-neutral-200 transition-all"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
