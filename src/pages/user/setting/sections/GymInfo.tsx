"use client";

import { useState } from "react";
import { Dumbbell, Save, Users } from "lucide-react";
import Input from '@/components/ui/Input';
import { updateGymInfoAction } from "@/actions/user/gym.actions";
import Toast from "@/components/ui/Toast";

interface GymInfoProps {
    name: string;
    specialty: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    capacity: number;
    memberSubscriptionTypes: string[];
}

export default function GymInfo({ name, specialty, phone, email, address, capacity, memberSubscriptionTypes }: GymInfoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: name || "",
        specialty: specialty || "",
        phone: phone || "",
        email: email || "",
        address: address || "",
        capacity: String(capacity || 100),
        memberSubscriptionTypes: memberSubscriptionTypes?.join("، ") || "عادي، بريميوم، VIP",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const typesArray = formData.memberSubscriptionTypes.split("،").map(t => t.trim()).filter(t => t !== "");
            const res = await updateGymInfoAction({
                ...formData,
                memberSubscriptionTypes: typesArray.length > 0 ? typesArray : ["عادي"]
            });
            if (res.success) {
                setToast({ message: "تم تحديث معلومات النادي بنجاح ✅", type: "success" });
                setIsEditing(false);
                setTimeout(() => window.location.reload(), 1500);
            }
        } catch {
            setToast({ message: "حدث خطأ أثناء التحديث", type: "error" });
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
                            <Save size={14} /> {isSubmitting ? "جاري الحفظ..." : "حفظ"}
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
                    id="gymSpecial" 
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

                {/* Capacity Field */}
                <div className="md:col-span-2 mt-2">
                    <div className="flex items-center gap-2 mb-3">
                        <Users size={16} className="text-brand-500" />
                        <span className="text-sm font-black text-neutral-700">إعدادات الاستيعاب</span>
                    </div>
                    <Input 
                        id="gymCapacity" 
                        label="السعة القصوى للصالة (عدد الأشخاص)" 
                        type="number" 
                        value={isEditing ? formData.capacity : String(capacity)}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        disabled={!isEditing}
                    />
                    <p className="text-[10px] font-bold text-neutral-400 mt-1">
                        يُستخدم هذا الرقم في حساب نسبة إشغال الصالة في الصفحة الرئيسية.
                    </p>
                </div>

                {/* Custom Subscriptions Field */}
                <div className="md:col-span-2 mt-2">
                    <div className="flex items-center gap-2 mb-3">
                        <Dumbbell size={16} className="text-brand-500" />
                        <span className="text-sm font-black text-neutral-700">أنواع الاشتراكات المتاحة</span>
                    </div>
                    <Input 
                        id="gymSubTypes" 
                        label="اكتب الأنواع وافصل بينها بفاصلة (،)" 
                        type="text" 
                        value={isEditing ? formData.memberSubscriptionTypes : memberSubscriptionTypes?.join("، ")}
                        onChange={(e) => setFormData({ ...formData, memberSubscriptionTypes: e.target.value })}
                        disabled={!isEditing}
                    />
                    <p className="text-[10px] font-bold text-neutral-400 mt-1">
                        مثال: اشتراك حديد، فتنس، VIP، كلاسات. هذه الأنواع ستظهر لك عند إضافة عضو جديد.
                    </p>
                </div>
            </form>

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