"use client";

import { useState } from "react";
import { Dumbbell, Save } from "lucide-react";
import Input from '@/components/ui/Input';
import { updateGymInfoAction } from "@/actions/user/gym.actions";

interface GymInfoProps {
    name: string;
    specialty: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
}

export default function GymInfo({ name, specialty, phone, email, address }: GymInfoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: name || "",
        specialty: specialty || "",
        phone: phone || "",
        email: email || "",
        address: address || ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const res = await updateGymInfoAction(formData);
        if (res.success) {
            alert("تم تحديث معلومات النادي بنجاح");
            setIsEditing(false);
            window.location.reload(); // To update sidebar etc
        } else {
            alert("حدث خطأ أثناء التحديث");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="relative flex flex-col gap-6 rounded-3xl bg-white p-8 text-right shadow-sm border border-neutral-100 sm:p-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 flex justify-center items-center rounded-xl bg-brand-50 text-brand-500">
                        <Dumbbell size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-neutral-900">معلومات النادي</h2>
                        <p className="text-[10px] font-bold text-neutral-500">البيانات العامة التي تظهر للمشتركين وفي التقارير.</p>
                    </div>
                </div>
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="text-xs font-black text-brand-500 hover:bg-brand-50 px-4 py-2 rounded-lg transition-colors">تعديل</button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={handleUpdate} disabled={isSubmitting} className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-brand-700 transition-all shadow-md shadow-brand-500/20">
                            <Save size={14} /> حفظ
                        </button>
                        <button onClick={() => setIsEditing(false)} className="bg-neutral-100 text-neutral-600 px-4 py-2 rounded-lg text-xs font-black hover:bg-neutral-200 transition-colors">إلغاء</button>
                    </div>
                )}
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <Input 
                        id="gymName" 
                        label="اسم النادي الرياضي" 
                        type="text" 
                        value={isEditing ? formData.name : name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                    />
                </div>
                <Input 
                    id="gymSpeicla" 
                    label="التخصص" 
                    type="text" 
                    value={isEditing ? formData.specialty : specialty ?? ""}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    disabled={!isEditing}
                />
                <Input 
                    id="gymPhone" 
                    label="رقم التواصل الرئيسي" 
                    type="text" 
                    value={isEditing ? formData.phone : phone ?? ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                />
                <Input 
                    id="gymEmail" 
                    label="البريد الإلكتروني للنادي" 
                    type="email" 
                    value={isEditing ? formData.email : email ?? ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                />
                <Input 
                    id="gymAddress" 
                    label="العنوان" 
                    type="text" 
                    value={isEditing ? formData.address : address ?? ""}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                />
            </form>
        </div>
    );
}