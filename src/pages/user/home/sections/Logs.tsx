"use client";

// ** Components
import Badge from "@/components/ui/Badge";
// ** Assets
import { EllipsisVertical, History, ArrowLeftCircle } from "lucide-react";
// ** Hooks && Tools
import Link from "next/link";


export default function Logs({ data }: { data: any[] }) {
    return (
        <div className="flex flex-col gap-6 xl:col-span-2">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                        <History size={20} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-black text-neutral-900 leading-tight">النشاط الأخير</h2>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">حركة الجيم الآن</p>
                    </div>
                </div>
                
                <Link 
                    href="/user/logs" 
                    className="group flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-brand-600 transition-all bg-white hover:bg-neutral-50 px-5 py-2.5 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md"
                >
                    عرض الكل
                    <ArrowLeftCircle size={16} className="text-neutral-400 group-hover:text-brand-500 transition-colors" />
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm">
                        <thead className="bg-neutral-50/50 text-neutral-500 font-bold border-b border-neutral-100">
                            <tr>
                                <th className="py-4 px-6">العضو</th>
                                <th className="py-4 px-6">الحركة</th>
                                <th className="py-4 px-6">الوقت</th>
                                <th className="py-4 px-6 text-left">التفاصيل</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                            {data && data.length > 0 ? data.map((log) => (
                                <tr key={log.id} className="hover:bg-neutral-50/30 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-brand-600 font-black border border-neutral-200">
                                                {log.memberName.substring(0, 1)}
                                            </div>
                                            <span className="font-black text-neutral-900">{log.memberName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg ${log.type === 'انصراف' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                            {log.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 font-bold text-neutral-600">
                                        {new Intl.DateTimeFormat('ar-EG', { timeStyle: 'short' }).format(new Date(log.time))}
                                    </td>
                                    <td className="py-4 px-6 text-left">
                                        <Badge className="bg-brand-50/50 text-[11px] font-bold text-brand-700 border border-brand-100 px-3">{log.badge}</Badge>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="py-16 text-center">
                                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300 mx-auto mb-4 border border-neutral-100">
                                             <History size={32} />
                                        </div>
                                        <p className="text-sm font-bold text-neutral-400">لا يوجد نشاط مسجل اليوم حتى الآن</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}