"use client";

import { useState } from "react";
import Modal from "@/components/popUp/Modal";
import Button from "@/components/ui/Button";
import CustomSelect from "@/components/ui/Select";
import { RefreshCw, Calendar } from "lucide-react";
import { renewMemberAction } from "@/actions/user/user.actions";
import Toast from "@/components/ui/Toast";

interface RenewMemberModalProps {
    member: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function RenewMemberModal({ member, isOpen, onClose }: RenewMemberModalProps) {
    const [months, setMonths] = useState(1);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

    const handleRenew = async () => {
        setLoading(true);
        try {
            await renewMemberAction(member.id, months);
            setToast({ message: "تم التجديد بنجاح ✅", type: "success" });
            setTimeout(() => onClose(), 1500);
        } catch (error) {
            setToast({ message: "حدث خطأ أثناء التجديد", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !member) return null;

    return (
        <>
        <Modal>
            <div className="flex flex-col gap-6 p-2">
                <div className="flex flex-col gap-1">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2">
                        <RefreshCw size={24} />
                    </div>
                    <h1 className="text-2xl font-black text-neutral-900">تجديد اشتراك</h1>
                    <p className="text-sm text-neutral-500 font-bold">تجديد اشتراك العضو: <span className="text-brand-600">{member.name}</span></p>
                </div>

                <div className="flex flex-col gap-4">
                    <CustomSelect 
                        label="مدة التجديد"
                        value={months}
                        onChange={(val) => setMonths(val)}
                        options={[
                            { label: "سيشن (يوم واحد)", value: 0 },
                            { label: "شهر واحد", value: 1 },
                            { label: "3 شهور", value: 3 },
                            { label: "6 شهور", value: 6 },
                            { label: "سنة كاملة", value: 12 }
                        ]}
                        icon={<Calendar size={18} />}
                    />
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <p className="text-xs text-emerald-700 font-bold leading-relaxed">
                            * سيتم إضافة المدة المختارة لتاريخ انتهاء الاشتراك الحالي، أو من تاريخ اليوم إذا كان الاشتراك منتهياً.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        variant="primary"
                        className="flex-1 py-4 rounded-2xl font-black bg-emerald-600 border-emerald-600 hover:bg-emerald-700"
                        onClick={handleRenew}
                        disabled={loading}
                    >
                        {loading ? "جاري التجديد..." : "تأكيد التجديد"}
                    </Button>
                    <Button
                        variant="guest"
                        className="flex-1 py-4 rounded-2xl font-black border-neutral-200"
                        onClick={onClose}
                        disabled={loading}
                    >
                        إلغاء
                    </Button>
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
