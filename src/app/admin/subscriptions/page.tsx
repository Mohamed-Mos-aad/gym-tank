"use client";

import { Plus, Check, Trash2, Edit2, TrendingUp, Users, Wallet, Clock, Percent, RefreshCw, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AdminSubscriptionsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="text-xs font-bold text-brand-500 mb-1 block">نظام الاشتراكات</span>
                    <h1 className="text-3xl font-black text-neutral-900 mb-2">إدارة الباقات</h1>
                    <p className="text-sm text-neutral-700 max-w-md">قم بتصميم وتعديل باقات الاشتراك الخاصة بمنصتك. استخدم الباقات المخصصة لجذب أنواع مختلفة من العملاء.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-brand-700 transition-colors shrink-0">
                    <Plus size={18} />
                    إضافة باقة جديدة
                </button>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pro Plan */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-brand-500 relative flex flex-col">
                    <div className="absolute top-6 right-6 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <ZapIcon size={12} />
                        الخيار الاحترافي
                    </div>
                    
                    <div className="mb-6 mt-4">
                        <h2 className="text-2xl font-black text-neutral-900 mb-2">Pro Plan</h2>
                        <div className="flex items-end gap-1 mb-2">
                            <span className="text-5xl font-black text-brand-500">$129</span>
                        </div>
                        <p className="text-sm text-neutral-500 font-bold">دفع سنوي موفر</p>
                    </div>

                    <p className="text-sm text-neutral-700 mb-8 max-w-sm">
                        للأندية الرياضية الكبيرة التي تبحث عن أتمتة كاملة وتجربة مستخدم مميزة.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <FeatureItem text="أعضاء غير محدودين" />
                        <FeatureItem text="دعم فني على مدار الساعة" />
                        <FeatureItem text="تحليلات متقدمة بالذكاء الاصطناعي" />
                        <FeatureItem text="ربط مع بوابات الدفع العالمية" />
                        <FeatureItem text="تطبيق جوال مخصص (White Label)" />
                        <FeatureItem text="إدارة الفروع المتعددة" />
                    </div>

                    <div className="flex gap-3 mt-auto">
                        <button className="flex-1 bg-brand-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors">
                            <Edit2 size={16} />
                            تعديل تفاصيل الباقة الاحترافية
                        </button>
                        <button className="bg-neutral-100 text-neutral-700 px-6 py-3 rounded-xl font-bold hover:bg-neutral-200 transition-colors">
                            إحصائيات المبيعات
                        </button>
                    </div>
                </div>

                {/* Basic Plan */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 flex flex-col relative">
                    <div className="absolute top-6 right-6 bg-brand-50 text-brand-500 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Check size={12} />
                        الأكثر شيوعاً للمبتدئين
                    </div>

                    <div className="mb-6 mt-4 flex flex-col items-center text-center">
                        <h2 className="text-2xl font-black text-neutral-900 mb-2">Basic Plan</h2>
                        <div className="flex items-end gap-1 mb-2">
                            <span className="text-5xl font-black text-brand-500">$49</span>
                            <span className="text-neutral-500 text-sm pb-2">/شهرياً</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-8 items-center">
                        <FeatureItem text="إدارة حتى 100 عضو" />
                        <FeatureItem text="نظام الحضور والانصراف" />
                        <FeatureItem text="تقارير مالية أساسية" />
                        <FeatureItem text="تطبيق الجوال للمشتركين" disabled />
                    </div>

                    <div className="flex gap-3 mt-auto">
                        <button className="flex-1 bg-neutral-100 text-brand-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors">
                            <Edit2 size={16} />
                            تعديل الباقة
                        </button>
                        <button className="bg-red-50 text-red-500 w-12 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-bold text-neutral-500 mb-2">الإيرادات المتوقعة</div>
                        <div className="text-2xl font-black text-neutral-900">$42,800</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                        <Wallet size={24} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-bold text-neutral-500 mb-2">نمو الاشتراكات (شهري)</div>
                        <div className="text-2xl font-black text-neutral-900">+24.5%</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-bold text-neutral-500 mb-2">إجمالي المشتركين النشطين</div>
                        <div className="text-2xl font-black text-neutral-900">1,429</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center">
                        <Users size={24} />
                    </div>
                </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                <div className="flex justify-between items-center mb-8 border-b border-neutral-100 pb-4">
                    <div>
                        <h2 className="text-xl font-black text-neutral-900">إعدادات الاشتراك المتقدمة</h2>
                        <p className="text-sm text-neutral-500 mt-1">تحكم في فترات السماح، الضرائب، وسياسات الاسترجاع.</p>
                    </div>
                    <Link href="/admin/settings" className="text-sm font-bold text-brand-500 hover:underline">تعديل كافة الإعدادات</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <Clock className="text-neutral-400 mt-1" size={20} />
                            <div>
                                <h3 className="font-bold text-neutral-900">فترة السماح بعد انتهاء الاشتراك</h3>
                                <p className="text-xs text-neutral-500 mt-1">الأيام التي يمكن للعضو فيها الدخول بعد الانتهاء</p>
                            </div>
                        </div>
                        <div className="bg-neutral-100 px-4 py-2 rounded-lg font-bold text-neutral-900 text-sm">3 أيام</div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <Percent className="text-neutral-400 mt-1" size={20} />
                            <div>
                                <h3 className="font-bold text-neutral-900">ضريبة القيمة المضافة</h3>
                                <p className="text-xs text-neutral-500 mt-1">تطبق على جميع الباقات عند الدفع</p>
                            </div>
                        </div>
                        <div className="bg-neutral-100 px-4 py-2 rounded-lg font-bold text-neutral-900 text-sm">15%</div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <RefreshCw className="text-neutral-400 mt-1" size={20} />
                            <div>
                                <h3 className="font-bold text-neutral-900">تجديد تلقائي</h3>
                                <p className="text-xs text-neutral-500 mt-1">محاولة سحب المبلغ تلقائياً عند انتهاء المدة</p>
                            </div>
                        </div>
                        <Toggle active={true} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <MessageSquare className="text-neutral-400 mt-1" size={20} />
                            <div>
                                <h3 className="font-bold text-neutral-900">إشعارات التذكير</h3>
                                <p className="text-xs text-neutral-500 mt-1">إرسال تنبيه قبل 3 أيام من الانتهاء</p>
                            </div>
                        </div>
                        <Toggle active={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ text, disabled = false }: { text: string, disabled?: boolean }) {
    return (
        <div className={`flex items-center gap-2 text-sm font-bold ${disabled ? 'text-neutral-400 opacity-50' : 'text-neutral-700'}`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${disabled ? 'bg-neutral-200' : 'bg-brand-50 text-brand-500'}`}>
                {disabled ? <div className="w-2 h-0.5 bg-neutral-400 rounded-full" /> : <Check size={12} />}
            </div>
            {text}
        </div>
    );
}

function ZapIcon(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    );
}

function Toggle({ active }: { active: boolean }) {
    return (
        <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${active ? 'bg-brand-500' : 'bg-neutral-300'}`}>
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${active ? '-translate-x-6' : 'translate-x-0'}`} />
        </div>
    );
}
