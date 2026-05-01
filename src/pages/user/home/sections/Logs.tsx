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
                    className="flex items-center gap-2 text-sm font-black text-brand-600 hover:text-brand-700 transition-colors bg-brand-50 px-4 py-2 rounded-xl border border-brand-100 shadow-sm"
                >
                    عرض الكل
                    <ArrowLeftCircle size={16} />
                </Link>
            </div>

            <ul className="w-full rounded-[24px] bg-white shadow-sm border border-neutral-100 overflow-hidden divide-y divide-neutral-50">
                {data && data.length > 0 ? data.map((log) => (
                    <li key={log.id} className="group flex w-full flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between hover:bg-neutral-50/50 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-brand-600 font-black border border-neutral-200 group-hover:scale-110 transition-transform">
                                {log.memberName.substring(0, 1)}
                            </div>
                            <div>
                                <h3 className="text-[16px] font-bold text-neutral-900 mb-0.5">{log.memberName}</h3>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg ${log.type === 'انصراف' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                        {log.type}
                                    </span>
                                    <span className="text-[11px] text-neutral-400 font-bold">•</span>
                                    <span className="text-[11px] text-neutral-500 font-bold">
                                        {new Intl.DateTimeFormat('ar-EG', { timeStyle: 'short' }).format(new Date(log.time))}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 self-end sm:self-auto">
                            <Badge className="bg-brand-50/50 text-[11px] font-bold text-brand-700 border border-brand-100 px-3">{log.badge}</Badge>
                            <button className="p-2 hover:bg-neutral-200/50 rounded-xl transition-colors text-neutral-300 hover:text-neutral-600">
                                <EllipsisVertical size={20} />
                            </button>
                        </div>
                    </li>
                )) : (
                    <div className="p-16 text-center">
                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300 mx-auto mb-4 border border-neutral-100">
                             <History size={32} />
                        </div>
                        <p className="text-sm font-bold text-neutral-400">لا يوجد نشاط مسجل اليوم حتى الآن</p>
                    </div>
                )}
            </ul>
        </div>
    )
}