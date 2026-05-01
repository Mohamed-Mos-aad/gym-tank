"use client";

import { useState } from "react";
import { RotateCcwKey, UserRound, Save, CheckCircle, X, ShieldCheck } from "lucide-react";
import Input from '@/components/ui/Input';
import { updateUserProfileAction } from "@/actions/user/user.actions";

interface OwnerInfoProps {
    ownerName?: string;
    ownerEmail?: string;
}

export default function OwnerInfo({ ownerName, ownerEmail }: OwnerInfoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isPassModalOpen, setIsPassModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: ownerName || "",
        email: ownerEmail || ""
    });
    const [passData, setPassData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const res = await updateUserProfileAction(formData);
        if (res.success) {
            alert("تم تحديث الملف الشخصي بنجاح");
            setIsEditing(false);
        } else {
            alert(res.error || "حدث خطأ ما");
        }
        setIsSubmitting(false);
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passData.newPassword !== passData.confirmPassword) {
            alert("كلمات المرور الجديدة غير متطابقة");
            return;
        }
        setIsSubmitting(true);
        const res = await updateUserProfileAction({ ...formData, ...passData });
        if (res.success) {
            alert("تم تغيير كلمة المرور بنجاح");
            setIsPassModalOpen(false);
            setPassData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } else {
            alert(res.error || "حدث خطأ ما");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="relative flex flex-col gap-6 rounded-3xl bg-white p-8 text-right shadow-sm border border-neutral-100 sm:p-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 flex justify-center items-center rounded-xl bg-orange-50 text-orange-600">
                        <UserRound size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-neutral-900">الملف الشخصي للمالك</h2>
                        <p className="text-[10px] font-bold text-neutral-500">بيانات حسابك الشخصي ووسيلة تسجيل الدخول.</p>
                    </div>
                </div>
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="text-xs font-black text-brand-500 hover:bg-brand-50 px-4 py-2 rounded-lg transition-colors">تعديل</button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={handleProfileUpdate} disabled={isSubmitting} className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-brand-700 transition-all shadow-md shadow-brand-500/20">
                            <Save size={14} /> حفظ
                        </button>
                        <button onClick={() => setIsEditing(false)} className="bg-neutral-100 text-neutral-600 px-4 py-2 rounded-lg text-xs font-black hover:bg-neutral-200 transition-colors">إلغاء</button>
                    </div>
                )}
            </div>

            <form className="flex flex-col gap-4">
                <Input 
                    id="gymOwnerName" 
                    label="اسم المالك الكامل" 
                    type="text" 
                    value={isEditing ? formData.name : ownerName} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                />
                <Input 
                    id="gymOwnerEmail" 
                    label="البريد الإلكتروني للحساب" 
                    type="email" 
                    value={isEditing ? formData.email : ownerEmail}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                />
            </form>

            <button 
                onClick={() => setIsPassModalOpen(true)}
                className="flex items-center gap-2 text-sm font-black text-brand-500 hover:bg-brand-50 w-fit px-4 py-2 rounded-xl transition-colors"
            >
                <RotateCcwKey size={18} />
                تغيير كلمة المرور
            </button>

            {/* Password Modal */}
            {isPassModalOpen && (
                <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-neutral-100 animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-neutral-50 flex justify-between items-center bg-neutral-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                                    <ShieldCheck size={20} />
                                </div>
                                <h2 className="text-lg font-black text-neutral-900">تغيير كلمة المرور</h2>
                            </div>
                            <button onClick={() => setIsPassModalOpen(false)} className="p-2 rounded-full hover:bg-neutral-100">
                                <X size={20} className="text-neutral-400" />
                            </button>
                        </div>
                        <form onSubmit={handlePasswordUpdate} className="p-6 flex flex-col gap-5">
                            <Input 
                                id="currentPassword" 
                                label="كلمة المرور الحالية" 
                                type="password" 
                                required
                                value={passData.currentPassword}
                                onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                            />
                            <div className="h-px bg-neutral-100 my-1"></div>
                            <Input 
                                id="newPassword" 
                                label="كلمة المرور الجديدة" 
                                type="password" 
                                required
                                value={passData.newPassword}
                                onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                            />
                            <Input 
                                id="confirmPassword" 
                                label="تأكيد كلمة المرور الجديدة" 
                                type="password" 
                                required
                                value={passData.confirmPassword}
                                onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                            />
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-500 text-white h-12 rounded-2xl font-black shadow-lg shadow-brand-500/20 hover:bg-brand-700 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? "جاري الحفظ..." : "تحديث كلمة المرور"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}