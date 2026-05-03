"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, CreditCard, Clock } from "lucide-react";
import { updatePaymentRequestStatus } from "@/actions/admin/plans.actions";
import Toast from "@/components/ui/Toast";

export default function PendingRequestsClient({ requests, currency }: { requests: any[], currency: string }) {
    const [isProcessing, setIsProcessing] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

    const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
        setIsProcessing(id);
        const res = await updatePaymentRequestStatus(id, status);
        if (res.success) {
            setToast({ message: status === "APPROVED" ? "تم قبول الطلب وتفعيل الباقة ✅" : "تم رفض الطلب ❌", type: "success" });
        } else {
            setToast({ message: res.error || "حدث خطأ", type: "error" });
        }
        setIsProcessing(null);
    };

    if (requests.length === 0) return null;

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 mt-8">
            <h2 className="text-xl font-black text-neutral-900 mb-6 flex items-center gap-2">
                <Clock className="text-orange-500" size={24} />
                طلبات التفعيل المعلقة
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                    <thead>
                        <tr className="text-neutral-500 border-b border-neutral-100">
                            <th className="py-3 px-4">الجيم / المالك</th>
                            <th className="py-3 px-4 text-center">الباقة المطلوبة</th>
                            <th className="py-3 px-4 text-center">المبلغ</th>
                            <th className="py-3 px-4 text-center">وسيلة الدفع</th>
                            <th className="py-3 px-4 text-center">ملاحظات</th>
                            <th className="py-3 px-4 text-center">الإجراء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/30">
                                <td className="py-4 px-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-neutral-900">{req.gym?.name}</span>
                                        <span className="text-xs text-neutral-500">{req.gym?.owner?.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center font-bold text-neutral-700">{req.plan?.name}</td>
                                <td className="py-4 px-4 text-center font-black text-brand-500">{currency} {req.amount}</td>
                                <td className="py-4 px-4 text-center">
                                    <div className="flex items-center justify-center gap-1 bg-neutral-100 px-3 py-1 rounded-full text-xs font-bold text-neutral-600 w-fit mx-auto">
                                        <CreditCard size={12} /> {req.method}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center max-w-[200px] truncate text-xs text-neutral-500" title={req.notes || ""}>
                                    {req.notes || "-"}
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button 
                                            onClick={() => handleAction(req.id, "APPROVED")}
                                            disabled={isProcessing === req.id}
                                            className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center disabled:opacity-50 transition-colors"
                                            title="قبول وتفعيل"
                                        >
                                            <CheckCircle2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleAction(req.id, "REJECTED")}
                                            disabled={isProcessing === req.id}
                                            className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center disabled:opacity-50 transition-colors"
                                            title="رفض الطلب"
                                        >
                                            <XCircle size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
