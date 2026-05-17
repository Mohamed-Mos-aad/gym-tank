"use client";

import { useState } from "react";
import { Settings, Globe, AlertTriangle, Plus, Loader2, CheckCircle2 } from "lucide-react";
import { updateGlobalSettings } from "@/actions/admin/settings.actions";

type SettingsData = {
    platformName: string;
    supportEmail: string;
    currency: string;
    timezone: string;
    maintenanceMode: boolean;
    maxMembersPerGym: number;
    maxCoachesPerGym: number;
    maxStorageMB: number;
    vatRate: number;
    gracePeriodDays: number;
    reminderDays: number;
    smtpHost?: string | null;
    smtpPort?: number | null;
    smtpUser?: string | null;
    smtpEncryption?: string | null;
};

interface AdminSettingsFormProps {
    initialData: SettingsData;
}

export default function AdminSettingsForm({ initialData }: AdminSettingsFormProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [formData, setFormData] = useState({
        platformName: initialData.platformName,
        supportEmail: initialData.supportEmail || "",
        currency: initialData.currency,
        timezone: initialData.timezone,
        maintenanceMode: initialData.maintenanceMode,
        maxMembersPerGym: initialData.maxMembersPerGym,
        maxCoachesPerGym: initialData.maxCoachesPerGym,
        maxStorageMB: initialData.maxStorageMB,
        vatRate: initialData.vatRate,
        gracePeriodDays: initialData.gracePeriodDays,
        reminderDays: initialData.reminderDays,
        smtpHost: initialData.smtpHost || "",
        smtpPort: initialData.smtpPort || 587,
        smtpUser: initialData.smtpUser || "",
        smtpEncryption: initialData.smtpEncryption || "TLS"
    });

    const handleSave = async () => {
        setIsSaving(true);
        const res = await updateGlobalSettings(formData);
        if (res.success) {
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }
        setIsSaving(false);
    };

    return (
        <div className="flex flex-col gap-8 pb-24 relative">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 mb-2">الإعدادات</h1>
                    <p className="text-sm text-neutral-700">تخصيص منصة جيم تانك وإدارة القواعد الافتراضية للنظام.</p>
                </div>
                {saveSuccess && (
                    <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl font-bold animate-in fade-in slide-in-from-top-2">
                        <CheckCircle2 size={18} />
                        تم حفظ التغييرات بنجاح
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Right Column (Forms) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* General Settings */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center justify-center mb-8 gap-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                                <Globe size={20} />
                            </div>
                            <h2 className="text-xl font-black text-neutral-900">إعدادات المنصة العامة</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2 text-center">اسم المنصة</label>
                                <input 
                                    type="text" 
                                    value={formData.platformName}
                                    onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
                                    className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2 text-center">البريد الإلكتروني للدعم</label>
                                <input 
                                    type="email" 
                                    value={formData.supportEmail}
                                    onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                                    className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2 text-center">العملة الافتراضية</label>
                                <select 
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                    className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors appearance-none text-center"
                                >
                                    <option value="EGP">جنيه مصري (EGP)</option>
                                    <option value="SAR">ريال سعودي (SAR)</option>
                                    <option value="AED">درهم إماراتي (AED)</option>
                                    <option value="USD">دولار أمريكي (USD)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2 text-center">المنطقة الزمنية</label>
                                <select 
                                    value={formData.timezone}
                                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                    className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors appearance-none text-center"
                                >
                                    <option value="GMT+02:00">القاهرة (GMT+02:00)</option>
                                    <option value="GMT+03:00">الرياض (GMT+03:00)</option>
                                    <option value="GMT+04:00">دبي (GMT+04:00)</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-neutral-100 pt-6">
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <h3 className="font-bold text-neutral-900 text-lg">وضع الصيانة</h3>
                                    <p className="text-sm text-neutral-500 mt-1">إيقاف المنصة مؤقتاً لجميع المستخدمين</p>
                                </div>
                                <Toggle 
                                    active={formData.maintenanceMode} 
                                    onClick={() => setFormData({ ...formData, maintenanceMode: !formData.maintenanceMode })} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Column (Cards) */}
                <div className="flex flex-col gap-6">
                    {/* Default Limits */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
                        <div className="flex justify-center items-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                                <Settings size={16} />
                            </div>
                            <h2 className="text-lg font-black text-neutral-900">الحدود والسياسات</h2>
                        </div>

                        <div className="flex flex-col gap-6">
                            <CounterCard 
                                title="الحد الأقصى للأعضاء / نادي" 
                                subtitle="العدد المسموح به لكل نادي جديد" 
                                value={formData.maxMembersPerGym} 
                                onChange={(val) => setFormData({ ...formData, maxMembersPerGym: val })}
                            />
                            <CounterCard 
                                title="عدد المدربين الافتراضي" 
                                subtitle="المدربين المسموح بهم في الباقة الأساسية" 
                                value={formData.maxCoachesPerGym} 
                                onChange={(val) => setFormData({ ...formData, maxCoachesPerGym: val })}
                            />
                            <CounterCard 
                                title="ضريبة القيمة المضافة (%)" 
                                subtitle="تطبق على جميع الباقات عند الدفع" 
                                value={formData.vatRate} 
                                onChange={(val) => setFormData({ ...formData, vatRate: val })}
                            />
                            <CounterCard 
                                title="فترة السماح (أيام)" 
                                subtitle="الأيام التي يمكن للعضو فيها الدخول بعد الانتهاء" 
                                value={formData.gracePeriodDays} 
                                onChange={(val) => setFormData({ ...formData, gracePeriodDays: val })}
                            />
                        </div>

                        <div className="mt-8 bg-orange-50 rounded-2xl p-4 flex gap-3 items-start border border-orange-100">
                            <AlertTriangle size={20} className="text-orange-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-orange-700 font-bold leading-relaxed">
                                تطبيق هذه التغييرات سيؤثر فقط على النوادي الجديدة المسجلة بعد هذا التاريخ.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="fixed bottom-0 left-0 right-0 lg:right-64 bg-white/80 backdrop-blur-md border-t border-neutral-200 p-4 sm:p-6 flex items-center justify-start gap-4 z-20" dir="ltr">
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-brand-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-brand-500/20 hover:bg-brand-600 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm flex items-center justify-center gap-2"
                >
                    {isSaving && <Loader2 className="animate-spin" size={18} />}
                    حفظ كافة الإعدادات
                </button>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-transparent text-neutral-500 font-bold px-6 py-3.5 rounded-xl hover:bg-neutral-100 hover:text-neutral-700 transition-all w-full sm:w-auto text-sm"
                >
                    إلغاء التغييرات
                </button>
            </div>
        </div>
    );
}

function Toggle({ active, onClick }: { active: boolean, onClick: () => void }) {
    return (
        <div 
            onClick={onClick}
            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${active ? 'bg-brand-500' : 'bg-neutral-300'}`}
        >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${active ? '-translate-x-6' : 'translate-x-0'}`} />
        </div>
    );
}

function CounterCard({ title, subtitle, value, onChange }: { title: string, subtitle: string, value: number, onChange: (val: number) => void }) {
    return (
        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 flex items-center justify-between">
            <div>
                <div className="text-sm font-bold text-neutral-900 mb-1">{title}</div>
                <div className="text-[10px] text-neutral-500">{subtitle}</div>
            </div>
            <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl border border-neutral-200 shadow-sm shrink-0">
                <button 
                    onClick={() => onChange(Math.max(0, value - 1))}
                    className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-brand-50 hover:text-brand-500 transition-colors"
                >
                    <Plus size={14} className="rotate-45" />
                </button>
                <span className="font-black text-neutral-900 min-w-[32px] text-center">{value}</span>
                <button 
                    onClick={() => onChange(value + 1)}
                    className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-brand-50 hover:text-brand-500 transition-colors"
                >
                    <Plus size={14} />
                </button>
            </div>
        </div>
    );
}
