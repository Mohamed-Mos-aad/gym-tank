"use client";

import { Settings, Server, Lock, CloudRain, Mail, Globe, AlertTriangle, Plus, Minus, Info } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="flex flex-col gap-8 pb-24 relative">
            <div>
                <h1 className="text-3xl font-black text-neutral-900 mb-2">الإعدادات</h1>
                <p className="text-sm text-neutral-700">تخصيص منصة جيم تانك وإدارة القواعد الافتراضية للنظام.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Right Column (Forms) - takes 2 columns in large screens */}
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
                                <input type="text" defaultValue="GymTank" className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2 text-center">البريد الإلكتروني للدعم</label>
                                <input type="email" defaultValue="support@gymtank.com" className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2 text-center">العملة الافتراضية</label>
                                <select className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors appearance-none text-center">
                                    <option>ريال سعودي (SAR)</option>
                                    <option>درهم إماراتي (AED)</option>
                                    <option>دولار أمريكي (USD)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2 text-center">المنطقة الزمنية</label>
                                <select className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors appearance-none text-center">
                                    <option>الرياض (GMT+03:00)</option>
                                    <option>دبي (GMT+04:00)</option>
                                    <option>القاهرة (GMT+02:00)</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-neutral-100 pt-6">
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <h3 className="font-bold text-neutral-900 text-lg">وضع الصيانة</h3>
                                    <p className="text-sm text-neutral-500 mt-1">إيقاف المنصة مؤقتاً لجميع المستخدمين</p>
                                </div>
                                <Toggle active={false} />
                            </div>
                        </div>
                    </div>

                    {/* SMTP Settings */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center justify-center mb-8 gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                <Mail size={20} />
                            </div>
                            <h2 className="text-xl font-black text-neutral-900">إعدادات البريد SMTP</h2>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2 text-center">خادم SMTP</label>
                                <input type="text" placeholder="smtp.provider.com" className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-neutral-700 mb-2 text-center">المنفذ (Port)</label>
                                    <input type="text" defaultValue="587" className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-neutral-700 mb-2 text-center">نوع التشفير</label>
                                    <select className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors appearance-none">
                                        <option>TLS</option>
                                        <option>SSL</option>
                                        <option>None</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-neutral-700 mb-2 text-center">اسم المستخدم</label>
                                <input type="text" className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-center font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors" />
                            </div>
                            <button className="w-full bg-neutral-100 text-brand-500 font-bold h-12 rounded-xl mt-2 hover:bg-neutral-200 transition-colors">
                                اختبار الاتصال
                            </button>
                        </div>
                    </div>
                </div>

                {/* Left Column (Cards) */}
                <div className="flex flex-col gap-6">
                    {/* Server Summary */}
                    <div className="bg-brand-50/50 rounded-3xl p-6 shadow-sm border border-brand-100">
                        <div className="flex items-center gap-2 mb-6 text-brand-700">
                            <Info size={18} />
                            <h2 className="text-sm font-bold">ملخص الخادم</h2>
                        </div>

                        <div className="flex flex-col gap-6 mb-8">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-neutral-700">سعة التخزين</span>
                                    <span className="text-brand-500">65%</span>
                                </div>
                                <div className="h-2 w-full bg-brand-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-500 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-neutral-700">استخدام الذاكرة</span>
                                    <span className="text-brand-500">42%</span>
                                </div>
                                <div className="h-2 w-full bg-brand-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-500 rounded-full" style={{ width: '42%' }}></div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-sm font-bold text-neutral-900 mb-4 text-center">أمان النظام</h3>
                        <div className="flex flex-col gap-3">
                            <div className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-white">
                                <div className="text-brand-500"><Lock size={20} /></div>
                                <div>
                                    <div className="text-sm font-bold text-neutral-900">تشفير SSL</div>
                                    <div className="text-xs text-neutral-500 mt-0.5">نشط ومحدث</div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-white">
                                <div className="text-orange-600"><CloudRain size={20} /></div>
                                <div>
                                    <div className="text-sm font-bold text-neutral-900">نسخ احتياطي يومي</div>
                                    <div className="text-xs text-neutral-500 mt-0.5">آخر نسخة: منذ ساعتين</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Default Limits */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
                        <div className="flex justify-center items-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                                <Settings size={16} />
                            </div>
                            <h2 className="text-lg font-black text-neutral-900">الحدود الافتراضية</h2>
                        </div>

                        <div className="flex flex-col gap-6">
                            <CounterCard title="الحد الأقصى للأعضاء / نادي" subtitle="العدد المسموح به لكل نادي جديد" value={500} />
                            <CounterCard title="عدد المدربين الافتراضي" subtitle="المدربين المسموح بهم في الباقة الأساسية" value={5} />
                            <CounterCard title="سعة تخزين الصور (MB)" subtitle="مساحة معرض الصور لكل نادي" value={1024} />
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
                <button className="bg-brand-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-brand-500/20 hover:bg-brand-600 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm">
                    حفظ كافة الإعدادات
                </button>
                <button className="bg-transparent text-neutral-500 font-bold px-6 py-3.5 rounded-xl hover:bg-neutral-100 hover:text-neutral-700 transition-all w-full sm:w-auto text-sm">
                    إلغاء التغييرات
                </button>
            </div>
        </div>
    );
}

function Toggle({ active }: { active: boolean }) {
    return (
        <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${active ? 'bg-brand-500' : 'bg-neutral-300'}`}>
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${active ? '-translate-x-6' : 'translate-x-0'}`} />
        </div>
    );
}

function CounterCard({ title, subtitle, value }: { title: string, subtitle: string, value: number }) {
    return (
        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 flex items-center justify-between">
            <div>
                <div className="text-sm font-bold text-neutral-900 mb-1">{title}</div>
                <div className="text-[10px] text-neutral-500">{subtitle}</div>
            </div>
            <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl border border-neutral-200 shadow-sm shrink-0">
                <button className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-brand-50 hover:text-brand-500 transition-colors">
                    <Minus size={14} />
                </button>
                <span className="font-black text-neutral-900 min-w-[32px] text-center">{value}</span>
                <button className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-brand-50 hover:text-brand-500 transition-colors">
                    <Plus size={14} />
                </button>
            </div>
        </div>
    );
}
