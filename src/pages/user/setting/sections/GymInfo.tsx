"use client";

import { useState, useEffect } from "react";
import { Dumbbell, Save, Users, Plus, Trash2, Coins } from "lucide-react";
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
    memberSubscriptionPrices?: string | null;
    currency?: string;
}

export default function GymInfo({
    name,
    specialty,
    phone,
    email,
    address,
    capacity,
    memberSubscriptionTypes,
    memberSubscriptionPrices,
    currency = "ر.س"
}: GymInfoProps) {
    let initialPriceMap: Record<string, number> = {};
    try {
        if (memberSubscriptionPrices) {
            initialPriceMap = JSON.parse(memberSubscriptionPrices);
        }
    } catch (e) {}

    const initialServices = (memberSubscriptionTypes && memberSubscriptionTypes.length > 0 
        ? memberSubscriptionTypes 
        : ["عادي", "بريميوم", "VIP"]
    ).map(type => ({
        name: type,
        price: initialPriceMap[type] !== undefined ? initialPriceMap[type] : 0
    }));

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: name || "",
        specialty: specialty || "",
        phone: phone || "",
        email: email || "",
        address: address || "",
        capacity: String(capacity || 100),
        currency: currency || "ر.س"
    });

    const [services, setServices] = useState(initialServices);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

    // Sync state when props change
    useEffect(() => {
        let priceMap: Record<string, number> = {};
        try {
            if (memberSubscriptionPrices) {
                priceMap = JSON.parse(memberSubscriptionPrices);
            }
        } catch (e) {}

        const updatedServices = (memberSubscriptionTypes && memberSubscriptionTypes.length > 0 
            ? memberSubscriptionTypes 
            : ["عادي", "بريميوم", "VIP"]
        ).map(type => ({
            name: type,
            price: priceMap[type] !== undefined ? priceMap[type] : 0
        }));

        setServices(updatedServices);
        setFormData({
            name: name || "",
            specialty: specialty || "",
            phone: phone || "",
            email: email || "",
            address: address || "",
            capacity: String(capacity || 100),
            currency: currency || "ر.س"
        });
    }, [name, specialty, phone, email, address, capacity, memberSubscriptionTypes, memberSubscriptionPrices, currency]);

    const handleAddService = () => {
        setServices([...services, { name: "", price: 0 }]);
    };

    const handleRemoveService = (index: number) => {
        setServices(services.filter((_, idx) => idx !== index));
    };

    const handleServiceChange = (index: number, field: "name" | "price", value: string | number) => {
        const updated = services.map((s, idx) => {
            if (idx === index) {
                return { ...s, [field]: value };
            }
            return s;
        });
        setServices(updated);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const typesArray = services.map(s => s.name.trim()).filter(Boolean);
            const pricesObject: Record<string, number> = {};
            services.forEach(s => {
                if (s.name.trim()) {
                    pricesObject[s.name.trim()] = Number(s.price) || 0;
                }
            });

            const res = await updateGymInfoAction({
                ...formData,
                memberSubscriptionTypes: typesArray.length > 0 ? typesArray : ["عادي"],
                memberSubscriptionPrices: JSON.stringify(pricesObject)
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
                        <h2 className="text-lg font-black text-neutral-900">معلومات النادي والخدمات</h2>
                        <p className="text-[10px] font-bold text-neutral-500">البيانات العامة والخدمات المقدمة وأسعارها والعملة.</p>
                    </div>
                </div>
                {!isEditing ? (
                    <button onClick={() => {
                        setFormData({
                            name: name || "",
                            specialty: specialty || "",
                            phone: phone || "",
                            email: email || "",
                            address: address || "",
                            capacity: String(capacity || 100),
                            currency: currency || "ر.س"
                        });
                        setServices(initialServices);
                        setIsEditing(true);
                    }} className="text-xs font-black text-brand-500 hover:bg-brand-50 px-4 py-2 rounded-lg transition-colors">تعديل</button>
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

                {/* Currency & Capacity Fields */}
                <div className="md:col-span-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Coins size={16} className="text-brand-500" />
                            <span className="text-sm font-black text-neutral-700">عملة النادي</span>
                        </div>
                        <Input 
                            id="gymCurrency" 
                            label="رمز العملة" 
                            type="text" 
                            value={isEditing ? formData.currency : currency}
                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                            disabled={!isEditing}
                            placeholder="ر.س، ج.م، USD..."
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Users size={16} className="text-brand-500" />
                            <span className="text-sm font-black text-neutral-700">إعدادات الاستيعاب</span>
                        </div>
                        <Input 
                            id="gymCapacity" 
                            label="السعة القصوى للصالة" 
                            type="number" 
                            value={isEditing ? formData.capacity : String(capacity)}
                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                {/* Subscription Services & Prices Field */}
                <div className="md:col-span-2 mt-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Dumbbell size={16} className="text-brand-500" />
                            <span className="text-sm font-black text-neutral-700">أنواع الاشتراكات والخدمات (بالسعر)</span>
                        </div>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleAddService}
                                className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <Plus size={14} /> إضافة خدمة
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        {services.map((service, index) => (
                            <div key={index} className="flex items-end gap-3 p-3 bg-neutral-50 border border-neutral-100 rounded-2xl">
                                <div className="flex-1">
                                    <Input
                                        id={`service-name-${index}`}
                                        label="اسم الخدمة / الاشتراك"
                                        type="text"
                                        value={service.name}
                                        onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                                        disabled={!isEditing}
                                        className="bg-white"
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Input
                                        id={`service-price-${index}`}
                                        label={`السعر (${isEditing ? formData.currency : currency})`}
                                        type="number"
                                        value={String(service.price)}
                                        onChange={(e) => handleServiceChange(index, "price", e.target.value)}
                                        disabled={!isEditing}
                                        className="bg-white"
                                    />
                                </div>
                                {isEditing && services.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveService(index)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors mb-0.5"
                                        title="حذف الخدمة"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <p className="text-[10px] font-bold text-neutral-400 mt-2">
                        يمكنك إضافة أو تعديل الخدمات المتاحة بالجيم وتحديد السعر المناسب لكل خدمة. سيتم حساب الإيرادات الشهرية المتوقعة بناءً على هذه الأسعار والعملة المحددة.
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