"use client";

import { Building2, Calendar, CheckCircle2, AlertCircle, Users, Banknote, HelpCircle, Activity, Waves, Dumbbell, Zap } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-neutral-900 mb-1">لوحة تحكم الإدارة</h1>
                    <p className="text-sm text-neutral-700">مرحباً بك مجدداً، إليك ملخص أداء النظام اليوم.</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-700 shadow-sm">
                    <Calendar size={16} className="text-brand-500" />
                    <span>14 أكتوبر 2023 - 21 أكتوبر 2023</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 border-r-4 border-r-brand-500 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-brand-500">
                        <span className="text-sm font-bold">إجمالي الجيمات</span>
                        <Building2 size={20} />
                    </div>
                    <div className="text-3xl font-black text-neutral-900">1,284</div>
                    <div className="text-xs text-brand-500 font-bold flex items-center gap-1">
                        <Activity size={12} />
                        12%+ الشهر الحالي
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 border-r-4 border-r-info-600 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-info-600">
                        <span className="text-sm font-bold">الجيمات النشطة</span>
                        <CheckCircle2 size={20} />
                    </div>
                    <div className="text-3xl font-black text-neutral-900">1,150</div>
                    <div className="text-xs text-info-600 font-bold flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-info-600"></div>
                        94% معدل النشاط
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 border-r-4 border-r-warn-700 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-warn-700">
                        <span className="text-sm font-bold">الجيمات المعلقة</span>
                        <AlertCircle size={20} />
                    </div>
                    <div className="text-3xl font-black text-neutral-900">134</div>
                    <div className="text-xs text-warn-700 font-bold">
                        تتطلب مراجعة فورية
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 border-r-4 border-r-brand-50 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-brand-500">
                        <span className="text-sm font-bold">عدد المستخدمين</span>
                        <Users size={20} />
                    </div>
                    <div className="text-3xl font-black text-neutral-900">42.5k</div>
                    <div className="text-xs text-brand-500 font-bold flex items-center gap-1">
                        <Users size={12} />
                        2.4k+ مستخدم جديد
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 border-r-4 border-r-purple-500 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-purple-600">
                        <span className="text-sm font-bold">الإيرادات</span>
                        <Banknote size={20} />
                    </div>
                    <div className="text-3xl font-black text-neutral-900">$84k</div>
                    <div className="text-xs text-purple-600 font-bold flex items-center gap-1">
                        <Activity size={12} />
                        8%+ عن المستهدف
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
                {/* Main Content (Charts) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-lg font-black text-neutral-900">نمو النوادي الرياضية</h2>
                                <p className="text-xs text-neutral-700">معدل تسجيل الجيمات الجديدة أسبوعياً</p>
                            </div>
                            <span className="text-xs font-bold bg-brand-50 text-brand-500 px-3 py-1 rounded-full">خط النمو</span>
                        </div>
                        {/* Placeholder for Bar Chart */}
                        <div className="h-64 flex items-end justify-between gap-2 px-2">
                            {[40, 60, 30, 80, 50, 40, 20].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div className={`w-full rounded-t-xl transition-all ${i === 3 ? 'bg-brand-500' : 'bg-brand-50'}`} style={{ height: `${h}%` }}>
                                        {i === 3 && <div className="text-white text-[10px] text-center font-bold mt-2">24<br/>جديد</div>}
                                    </div>
                                    <span className="text-xs text-neutral-700 font-bold">
                                        {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 h-64 flex flex-col justify-center items-center">
                         <h2 className="text-lg font-black text-neutral-900 self-start mb-auto">إحصائيات الاشتراكات</h2>
                         <div className="flex items-end gap-16 mt-auto w-full justify-center text-sm font-bold text-neutral-700 pb-4">
                             <span>الخطة الأساسية</span>
                             <span>الخطة المتقدمة</span>
                             <span>خطة المؤسسات</span>
                         </div>
                    </div>
                </div>

                {/* Sidebar Content (Latest Gyms) */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-black text-neutral-900">أحدث النوادي</h2>
                            <Link href="/admin/gyms" className="text-xs font-bold text-brand-500 hover:underline">عرض الكل</Link>
                        </div>

                        <div className="flex flex-col gap-5">
                            {[
                                { name: "أيرون فيست جيم", loc: "الرياض، المملكة العربية السعودية", status: "نشط", time: "منذ ساعتين", icon: Dumbbell, color: "text-brand-500", bg: "bg-brand-50" },
                                { name: "نادي بلو ووتر", loc: "دبي، الإمارات العربية المتحدة", status: "قيد المراجعة", time: "منذ 5 ساعات", icon: Waves, color: "text-info-600", bg: "bg-blue-50" },
                                { name: "أكاديمية الفنون القتالية", loc: "جدة، المملكة العربية السعودية", status: "نشط", time: "أمس", icon: Building2, color: "text-neutral-700", bg: "bg-neutral-100" },
                                { name: "باور هاوس جيم", loc: "الكويت، الكويت", status: "نشط", time: "منذ يومين", icon: Zap, color: "text-brand-500", bg: "bg-brand-50" },
                            ].map((gym, i) => (
                                <div key={i} className="flex gap-3 items-center border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${gym.bg} ${gym.color} shrink-0`}>
                                        <gym.icon size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-bold text-neutral-900 truncate">{gym.name}</h3>
                                        <p className="text-xs text-neutral-500 truncate mt-0.5">{gym.loc}</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${gym.status === 'نشط' ? 'bg-brand-50 text-brand-500' : 'bg-orange-50 text-orange-600'}`}>
                                                {gym.status}
                                            </span>
                                            <span className="text-[10px] text-neutral-400">{gym.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-neutral-100 rounded-3xl p-6 text-center border border-neutral-200 border-dashed flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-500 mb-3 shadow-sm">
                            <HelpCircle size={24} />
                        </div>
                        <h3 className="text-sm font-bold text-neutral-900 mb-2">هل تحتاج للمساعدة؟</h3>
                        <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                            الدعم الفني متاح على مدار الساعة لمساعدتك في إدارة المنصة.
                        </p>
                        <button className="w-full bg-white text-brand-500 border border-brand-500/20 font-bold py-2.5 rounded-xl text-sm transition-all hover:bg-brand-50 hover:border-brand-500">
                            تواصل مع الدعم
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
