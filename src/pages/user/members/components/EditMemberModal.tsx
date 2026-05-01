"use client";

import { useState } from "react";
import Modal from "@/components/popUp/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CustomSelect from "@/components/ui/Select";
import { User, Phone, CreditCard } from "lucide-react";
import { updateMemberAction } from "@/actions/user/user.actions";

interface EditMemberModalProps {
    member: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditMemberModal({ member, isOpen, onClose }: EditMemberModalProps) {
    const [data, setData] = useState({
        name: member.name,
        phone: member.phone,
        subscriptionType: member.subscriptionType || "عادي",
    });
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await updateMemberAction(member.id, data);
            onClose();
        } catch (error) {
            alert("حدث خطأ أثناء التحديث");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal>
            <div className="flex flex-col gap-6 p-2">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-black text-neutral-900">تعديل بيانات العضو</h1>
                    <p className="text-sm text-neutral-500 font-bold">تحديث معلومات العضو: <span className="text-brand-600">{member.name}</span></p>
                </div>

                <div className="flex flex-col gap-4">
                    <Input 
                        id="editName"
                        type="text"
                        label="اسم العضو"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        placeholder="الاسم الكامل"
                    />
                    <Input 
                        id="editPhone"
                        type="text"
                        label="رقم الهاتف"
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        placeholder="01xxxxxxxxx"
                    />
                    <CustomSelect 
                        label="نوع الاشتراك"
                        value={data.subscriptionType}
                        onChange={(val) => setData({ ...data, subscriptionType: val })}
                        options={[
                            { label: "عادي (Standard)", value: "عادي" },
                            { label: "بريميوم (Premium)", value: "بريميوم" },
                            { label: "VIP", value: "VIP" }
                        ]}
                        icon={<CreditCard size={18} />}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Button
                        variant="primary"
                        className="flex-1 py-4 rounded-2xl font-black"
                        onClick={handleUpdate}
                        disabled={loading}
                    >
                        {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
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
    );
}
