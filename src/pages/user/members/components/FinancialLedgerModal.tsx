"use client";

import { useState } from "react";
import Modal from "@/components/popUp/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CustomSelect from "@/components/ui/Select";
import Toast from "@/components/ui/Toast";
import { X, DollarSign, CreditCard, Coins, Receipt, ArrowLeftRight, Calendar } from "lucide-react";
import { addMemberPaymentAction } from "@/actions/user/user.actions";
import { useRouter } from "next/navigation";

interface FinancialLedgerModalProps {
    member: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function FinancialLedgerModal({ member, isOpen, onClose }: FinancialLedgerModalProps) {
    const router = useRouter();
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("نقدي");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

    if (!isOpen || !member) return null;

    const totalPrice = member.totalPrice || 0;
    const amountPaid = member.amountPaid || 0;
    const remaining = Math.max(0, totalPrice - amountPaid);
    const payments = member.payments || [];

    const handleAddPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        const payAmount = parseFloat(amount);
        if (!payAmount || payAmount <= 0) {
            setToast({ message: "يرجى إدخال مبلغ صحيح", type: "error" });
            return;
        }

        if (payAmount > remaining) {
            setToast({ message: `المبلغ المدخل أكبر من المتبقي (${remaining} ج.م)`, type: "error" });
            return;
        }

        setLoading(true);
        try {
            const res = await addMemberPaymentAction(member.id, payAmount, method, notes);
            if (res && res.success) {
                setToast({ message: "تم تسجيل الدفعة بنجاح ✅", type: "success" });
                setAmount("");
                setNotes("");
                // Refresh to reload server component state
                router.refresh();
                // Close after a brief delay
                setTimeout(() => onClose(), 1500);
            } else {
                setToast({ message: "حدث خطأ أثناء حفظ الدفعة", type: "error" });
            }
        } catch (error: any) {
            setToast({ message: error.message || "حدث خطأ غير متوقع", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: any) => {
        return new Intl.DateTimeFormat('ar-EG', { 
            dateStyle: 'medium', 
            timeStyle: 'short' 
        }).format(new Date(date));
    };

    return (
        <>
            <Modal>
                <div className="flex flex-col gap-6 p-2 max-h-[85vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                                <DollarSign size={24} />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-black text-neutral-900 leading-tight">السجل المالي للعضو</h1>
                                <p className="text-sm font-bold text-neutral-500">
                                    العضو: <span className="text-brand-600 font-extrabold">{member.name}</span>
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-neutral-100 rounded-xl transition-colors text-neutral-400 hover:text-neutral-600 cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Financial Summary Cards */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        {/* Sub Price */}
                        <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 flex flex-col gap-1.5">
                            <span className="text-xs font-bold text-neutral-400">قيمة الاشتراك الحالي</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-neutral-900">{totalPrice}</span>
                                <span className="text-xs font-extrabold text-neutral-500">ج.م</span>
                            </div>
                        </div>

                        {/* Paid */}
                        <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/50 flex flex-col gap-1.5">
                            <span className="text-xs font-bold text-emerald-700">إجمالي المدفوع</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-emerald-600">{amountPaid}</span>
                                <span className="text-xs font-extrabold text-emerald-500">ج.م</span>
                            </div>
                        </div>

                        {/* Remaining */}
                        <div className={`p-4 rounded-2xl flex flex-col gap-1.5 border ${
                            remaining > 0 
                                ? 'bg-rose-50/50 border-rose-100/50' 
                                : 'bg-emerald-50/40 border-emerald-100/50'
                        }`}>
                            <span className={`text-xs font-bold ${remaining > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                                المتبقي عليه (الديون)
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className={`text-2xl font-black ${remaining > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                    {remaining}
                                </span>
                                <span className="text-xs font-extrabold text-neutral-500">ج.م</span>
                                {remaining === 0 && (
                                    <span className="mr-2 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-black border border-emerald-200">مخلص الدفع ✅</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Record New Payment Form (Only if remaining > 0) */}
                    {remaining > 0 && (
                        <form onSubmit={handleAddPayment} className="p-5 bg-neutral-50 border border-neutral-100 rounded-3xl flex flex-col gap-4">
                            <h2 className="text-sm font-black text-neutral-800 flex items-center gap-2">
                                <Coins size={16} className="text-brand-500" />
                                تحصيل دفعة جديدة تحت الحساب
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-3 items-end">
                                <Input
                                    type="number"
                                    id="payAmountInput"
                                    placeholder={`المتبقي: ${remaining}`}
                                    label="مبلغ الدفعة"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                                <CustomSelect 
                                    label="طريقة الدفع"
                                    value={method}
                                    onChange={(val) => setMethod(val)}
                                    options={[
                                        { label: "نقدي", value: "نقدي" },
                                        { label: "شبكة / فيزا", value: "شبكة" },
                                        { label: "تحويل بنكي", value: "تحويل" },
                                        { label: "فودافون كاش", value: "فودافون كاش" }
                                    ]}
                                    icon={<CreditCard size={18} />}
                                />
                                <Input
                                    type="text"
                                    id="payNotesInput"
                                    placeholder="ملاحظات اختيارية"
                                    label="تفاصيل الدفعة"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                variant="primary" 
                                className="w-full sm:w-fit py-3 px-6 rounded-xl font-black text-sm self-end"
                                disabled={loading}
                            >
                                {loading ? "جاري تسجيل الدفعة..." : "تحصيل وتسجيل الدفعة"}
                            </Button>
                        </form>
                    )}

                    {/* Payment History Ledger */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-md font-black text-neutral-900 flex items-center gap-2">
                            <Receipt size={18} className="text-neutral-500" />
                            سجل التجديدات والمدفوعات التاريخي
                        </h2>
                        
                        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-right text-xs">
                                    <thead className="bg-neutral-50 text-neutral-500 font-bold border-b border-neutral-100">
                                        <tr>
                                            <th className="py-3 px-4">التاريخ</th>
                                            <th className="py-3 px-4">المبلغ</th>
                                            <th className="py-3 px-4">طريقة الدفع</th>
                                            <th className="py-3 px-4">ملاحظات العملية</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-50 font-bold text-neutral-700">
                                        {payments.length > 0 ? (
                                            payments.map((p: any) => (
                                                <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                                                    <td className="py-3 px-4 font-bold text-neutral-500">
                                                        {formatDate(p.paidAt)}
                                                    </td>
                                                    <td className="py-3 px-4 text-emerald-600 font-black">
                                                        +{p.amount} ج.م
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md border border-neutral-200/50">
                                                            {p.method}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-neutral-600 font-semibold">
                                                        {p.notes || "-"}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="py-8 text-center text-neutral-400 italic">
                                                    لا توجد مدفوعات مسجلة لهذا العضو بعد.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
}
