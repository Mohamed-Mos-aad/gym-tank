"use client";

import { useState } from "react";
import { User, Mail, Shield, Lock, Save, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { updateAdminProfileAction } from "@/actions/admin/admin.actions";

interface AdminProfileFormProps {
    initialUser: any;
}

export default function AdminProfileForm({ initialUser }: AdminProfileFormProps) {
    const [user, setUser] = useState<any>(initialUser);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        name: initialUser?.name || "",
        email: initialUser?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'كلمات المرور الجديدة غير متطابقة' });
            return;
        }

        setSaving(true);
        try {
            const result = await updateAdminProfileAction(formData);
            if (result.success) {
                setMessage({ type: 'success', text: 'تم تحديث الملف الشخصي بنجاح' });
                setUser((prev: any) => ({
                    ...prev,
                    name: formData.name,
                    email: formData.email
                }));
                setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
            } else {
                setMessage({ type: 'error', text: result.error || 'حدث خطأ أثناء التحديث' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'فشل الاتصال بالخادم' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
            <div>
                <h1 className="text-2xl font-black text-neutral-900 mb-1">الملف الشخصي</h1>
                <p className="text-sm text-neutral-700">إدارة بيانات حسابك وتغيير كلمة المرور</p>
            </div>

            {message && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 border ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span className="text-sm font-bold">{message.text}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Side: Avatar and Quick Info */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center font-black text-3xl border-4 border-white shadow-md mb-4">
                            {user?.name?.substring(0, 1).toUpperCase()}
                        </div>
                        <h2 className="text-xl font-black text-neutral-900 mb-1">{user?.name}</h2>
                        <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-black mb-4">
                            {user?.role === "ADMIN" ? "مدير عام" : "مالك نادي"}
                        </span>
                        <div className="w-full pt-6 border-t border-neutral-50 flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                                <Mail size={16} className="text-neutral-400" />
                                <span className="truncate">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                                <Shield size={16} className="text-neutral-400" />
                                <span>صلاحيات كاملة</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Edit Forms */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                                <User size={20} />
                            </div>
                            <h3 className="text-lg font-black text-neutral-900">البيانات الأساسية</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-neutral-700">الاسم الكامل</label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors"
                                    placeholder="أدخل اسمك الكامل"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-neutral-700">البريد الإلكتروني</label>
                                <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors"
                                    placeholder="example@gmail.com"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-10 mb-8 pt-10 border-t border-neutral-50">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                                <Lock size={20} />
                            </div>
                            <h3 className="text-lg font-black text-neutral-900">أمان الحساب</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-neutral-700">كلمة المرور الحالية</label>
                                <input 
                                    type="password" 
                                    value={formData.currentPassword}
                                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                    className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors"
                                    placeholder="أدخل كلمة المرور الحالية لتغييرها"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-neutral-700">كلمة المرور الجديدة</label>
                                    <input 
                                        type="password" 
                                        value={formData.newPassword}
                                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                        className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-neutral-700">تأكيد كلمة المرور</label>
                                    <input 
                                        type="password" 
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-end">
                            <button 
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 bg-brand-500 text-white px-8 py-3 rounded-2xl font-black hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                حفظ التغييرات
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
