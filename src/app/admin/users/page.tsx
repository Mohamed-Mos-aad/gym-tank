"use client";

import { Search, Filter, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft, MoreVertical } from "lucide-react";
import Image from "next/image";

export default function AdminUsersPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="text-xs font-bold text-brand-500 mb-1 block">الإدارة العامة</span>
                    <h1 className="text-3xl font-black text-neutral-900 mb-2">المستخدمين</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-700 shadow-sm hover:bg-neutral-50 transition-colors">
                        <Filter size={16} />
                        تصفية
                    </button>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="البحث عن مالك..." 
                            className="h-10 w-64 rounded-xl border border-neutral-200 bg-white pr-10 pl-4 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 shadow-sm"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex flex-col justify-between relative overflow-hidden h-40">
                    <div className="flex justify-between items-start z-10">
                        <span className="font-bold text-neutral-700">حسابات معطلة</span>
                        <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                            <AlertTriangle size={16} />
                        </div>
                    </div>
                    <div className="text-4xl font-black text-neutral-900 z-10 text-center">128</div>
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-100">
                        <div className="h-full bg-orange-600 w-1/4 rounded-r-full"></div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex flex-col justify-between relative overflow-hidden h-40">
                    <div className="flex justify-between items-start z-10">
                        <span className="font-bold text-neutral-700">نشطون حالياً</span>
                        <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
                            <CheckCircle2 size={16} />
                        </div>
                    </div>
                    <div className="text-4xl font-black text-neutral-900 z-10 text-center">1,120</div>
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-100">
                        <div className="h-full bg-brand-500 w-3/4 rounded-r-full"></div>
                    </div>
                </div>

                <div className="bg-brand-500 text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between h-40 relative overflow-hidden">
                    {/* Abstract circles decoration */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
                    
                    <div className="flex justify-between items-start z-10">
                        <span className="text-brand-50 font-bold text-sm bg-white/10 px-3 py-1 rounded-full">النمو السنوي</span>
                    </div>
                    <div className="text-center z-10 flex flex-col items-center">
                        <div className="text-5xl font-black mb-1">1,248</div>
                        <span className="text-sm font-bold text-brand-100">إجمالي مالكي النوادي</span>
                    </div>
                    <div className="z-10 flex justify-center mt-2">
                        <span className="text-xs font-bold flex items-center gap-1">
                            <span className="bg-white/20 p-0.5 rounded-full"><ChevronRight size={10} className="rotate-90" /></span>
                            12%+ زيادة عن الشهر الماضي
                        </span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-neutral-700">
                        <thead className="bg-white border-b border-neutral-100 text-neutral-500 font-bold">
                            <tr>
                                <th className="px-6 py-4 rounded-tr-3xl">الاسم</th>
                                <th className="px-6 py-4 text-center">الإيميل</th>
                                <th className="px-6 py-4 text-center">عدد الجيمات</th>
                                <th className="px-6 py-4 text-center">الحالة</th>
                                <th className="px-6 py-4 text-center rounded-tl-3xl">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium">
                            {[
                                { name: "أحمد عبد الله", time: "منذ 3 أشهر", email: "ahmed@example.com", branches: "4 فروع", status: "نشط", initials: "أ ع", active: true },
                                { name: "سارة منصور", time: "منذ عام", email: "sara.m@fitlife.sa", branches: "1 فرع", status: "نشط", avatar: true, active: true },
                                { name: "محمد خالد", time: "منذ أسبوعين", email: "m.khaled@gym.net", branches: "2 فروع", status: "معطل", initials: "م خ", active: false, disabledRow: true },
                                { name: "ياسمين سمير", time: "منذ 5 أشهر", email: "yasmin@powerup.com", branches: "12 فرع", status: "نشط", initials: "ي س", active: true }
                            ].map((row, i) => (
                                <tr key={i} className={`transition-colors ${row.disabledRow ? 'bg-neutral-50/50 opacity-70' : 'hover:bg-neutral-50'}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {row.avatar ? (
                                                <div className="w-12 h-12 rounded-full bg-brand-700 text-white flex items-center justify-center overflow-hidden border-2 border-white shadow-sm shrink-0">
                                                    <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" width={48} height={48} alt="avatar" />
                                                </div>
                                            ) : (
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 border-2 border-white shadow-sm ${row.disabledRow ? 'bg-neutral-200 text-neutral-500' : 'bg-brand-50 text-brand-500'}`}>
                                                    {row.initials}
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-bold text-neutral-900 text-base">{row.name}</div>
                                                <div className="text-xs text-neutral-500">{row.time}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-neutral-500">{row.email}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${row.disabledRow ? 'bg-neutral-200 text-neutral-500' : 'bg-purple-50 text-purple-600'}`}>
                                            {row.branches}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${row.active ? 'bg-brand-500' : 'bg-neutral-400'}`}></div>
                                            <span className={`font-bold ${row.active ? 'text-brand-500' : 'text-neutral-500'}`}>{row.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-2 rounded-lg text-neutral-400 hover:text-brand-500 hover:bg-brand-50 transition-colors">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between text-sm bg-white">
                    <span className="text-neutral-500">عرض 10 من أصل 1,248 مستخدم</span>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 cursor-not-allowed">
                            <ChevronRight size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold">1</button>
                        <button className="w-8 h-8 rounded-lg hover:bg-neutral-50 text-neutral-700 font-bold">2</button>
                        <button className="w-8 h-8 rounded-lg hover:bg-neutral-50 text-neutral-700 font-bold">3</button>
                        <span className="text-neutral-400">...</span>
                        <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">
                            <ChevronLeft size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
