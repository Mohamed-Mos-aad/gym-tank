"use client";

import { useState } from "react";
import { Plus, Check, Trash2, Edit2, Zap, X, AlertTriangle } from "lucide-react";
import { createPlan, updatePlan, deletePlan } from "@/actions/admin/plans.actions";
import Modal from "@/components/popUp/Modal";
import Button from "@/components/ui/Button";

type PlanData = {
    id: string;
    name: string;
    price: number;
    description: string | null;
    features: string[];
    isPopular: boolean;
};

export default function AdminPlansClient({ initialPlans, currency = "SAR" }: { initialPlans: PlanData[], currency?: string }) {
    const [plans, setPlans] = useState<PlanData[]>(initialPlans);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [editingPlan, setEditingPlan] = useState<PlanData | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        isPopular: false,
        features: [""]
    });

    const openAddModal = () => {
        setEditingPlan(null);
        setFormData({
            name: "",
            price: "",
            description: "",
            isPopular: false,
            features: [""]
        });
        setIsModalOpen(true);
    };

    const openEditModal = (plan: PlanData) => {
        setEditingPlan(plan);
        setFormData({
            name: plan.name,
            price: plan.price.toString(),
            description: plan.description || "",
            isPopular: plan.isPopular,
            features: plan.features.length > 0 ? [...plan.features] : [""]
        });
        setIsModalOpen(true);
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeatureField = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const removeFeatureField = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures.length > 0 ? newFeatures : [""] });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = {
            name: formData.name,
            price: parseFloat(formData.price),
            description: formData.description,
            features: formData.features.filter(f => f.trim() !== ""),
            isPopular: formData.isPopular
        };

        if (editingPlan) {
            const res = await updatePlan(editingPlan.id, data);
            if (res.success) {
                // In a real app with revalidatePath, we might just refresh or wait
                // but for immediate UI feedback:
                setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, ...data } : p));
                setIsModalOpen(false);
            }
        } else {
            const res = await createPlan(data);
            if (res.success) {
                // Refreshing is better, but let's assume we need to update state if we don't want a full reload
                // For simplicity, let's just close and hope revalidatePath does its job (it usually needs a refresh in client components)
                window.location.reload(); 
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("هل أنت متأكد من حذف هذه الباقة؟")) {
            setIsDeleting(id);
            const res = await deletePlan(id);
            if (res.success) {
                setPlans(plans.filter(p => p.id !== id));
            }
            setIsDeleting(null);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="text-xs font-bold text-brand-500 mb-1 block">نظام الاشتراكات</span>
                    <h1 className="text-3xl font-black text-neutral-900 mb-2">إدارة الباقات</h1>
                    <p className="text-sm text-neutral-700 max-w-md">قم بتصميم وتعديل باقات الاشتراك الخاصة بمنصتك. استخدم الباقات المخصصة لجذب أنواع مختلفة من العملاء.</p>
                </div>
                <button 
                    onClick={openAddModal}
                    className="flex items-center justify-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-brand-700 transition-colors shrink-0"
                >
                    <Plus size={18} />
                    إضافة باقة جديدة
                </button>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.length > 0 ? plans.map((plan) => (
                    <div key={plan.id} className={`bg-white rounded-3xl p-8 shadow-sm border-2 flex flex-col relative transition-all hover:shadow-md ${plan.isPopular ? 'border-brand-500' : 'border-neutral-100'}`}>
                        {plan.isPopular && (
                            <div className="absolute top-6 right-6 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                <Zap size={12} />
                                الخيار الاحترافي
                            </div>
                        )}
                        
                        <div className="mb-6 mt-4">
                            <h2 className="text-2xl font-black text-neutral-900 mb-2">{plan.name}</h2>
                            <div className="flex items-end gap-1 mb-2">
                                <span className="text-4xl font-black text-brand-500">{currency} {plan.price}</span>
                            </div>
                            <p className="text-sm text-neutral-500 font-bold">باقة مخصصة</p>
                        </div>

                        <p className="text-sm text-neutral-700 mb-8 max-w-sm">
                            {plan.description || "لا يوجد وصف لهذه الباقة حالياً."}
                        </p>

                        <div className="flex flex-col gap-4 mb-8">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm font-bold text-neutral-700">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-brand-50 text-brand-500">
                                        <Check size={12} />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <button 
                                onClick={() => openEditModal(plan)}
                                className="flex-1 bg-neutral-100 text-neutral-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                            >
                                <Edit2 size={16} />
                                تعديل
                            </button>
                            <button 
                                onClick={() => handleDelete(plan.id)}
                                disabled={isDeleting === plan.id}
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isDeleting === plan.id ? 'bg-neutral-100 text-neutral-400' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-dashed border-neutral-200">
                        <p className="text-neutral-500 font-bold mb-4">لا توجد باقات اشتراك مضافة حالياً.</p>
                        <button onClick={openAddModal} className="text-brand-500 font-black hover:underline">أضف أول باقة الآن</button>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <Modal>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-black text-neutral-900">{editingPlan ? "تعديل الباقة" : "إضافة باقة جديدة"}</h2>
                        <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-neutral-700">اسم الباقة</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl bg-neutral-100 py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-brand-500/20"
                                    placeholder="مثال: الباقة الأساسية"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-neutral-700">السعر ({currency})</label>
                                <input 
                                    type="number" 
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full rounded-xl bg-neutral-100 py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-brand-500/20"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-neutral-700">الوصف</label>
                            <textarea 
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full rounded-xl bg-neutral-100 py-3 px-4 font-bold outline-none focus:ring-2 focus:ring-brand-500/20 h-24 resize-none"
                                placeholder="وصف قصير للباقة..."
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-neutral-700">المميزات</label>
                                <button 
                                    type="button" 
                                    onClick={addFeatureField}
                                    className="text-xs font-bold text-brand-500 hover:underline flex items-center gap-1"
                                >
                                    <Plus size={14} /> إضافة ميزة
                                </button>
                            </div>
                            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                                            className="flex-1 rounded-xl bg-neutral-100 py-2 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500/20"
                                            placeholder="ميزة جديدة..."
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => removeFeatureField(index)}
                                            className="text-red-400 hover:text-red-600 p-2"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-brand-50 p-4 rounded-2xl border border-brand-100">
                            <input 
                                type="checkbox" 
                                id="isPopular"
                                checked={formData.isPopular}
                                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                                className="w-5 h-5 accent-brand-500 cursor-pointer"
                            />
                            <label htmlFor="isPopular" className="text-sm font-bold text-brand-700 cursor-pointer flex items-center gap-2">
                                <Zap size={16} />
                                تمييز كـ "خيار احترافي" (Popular)
                            </label>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <Button variant="primary" type="submit" className="flex-1 py-4">
                                {editingPlan ? "تحديث التغييرات" : "حفظ الباقة الجديدة"}
                            </Button>
                            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="px-8">
                                إلغاء
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}
