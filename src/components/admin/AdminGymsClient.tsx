"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Filter, ChevronRight, ChevronLeft, CheckCircle2, Circle } from "lucide-react";
import { updateGymStatus } from "@/actions/admin/admin.actions";

type GymData = any; // Since Prisma types are tricky to import inline, we use any for simplicity

export default function AdminGymsClient({ initialGyms }: { initialGyms: GymData[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("ALL"); // ALL, PENDING, APPROVED, REJECTED
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredGyms = initialGyms.filter(gym => {
        const matchesSearch = gym.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (gym.owner?.name && gym.owner.name.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesStatus = filterStatus === "ALL" ? true : gym.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date(date));
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black text-neutral-900 mb-1">إدارة الجيمات</h1>
                    <p className="text-sm text-neutral-700">مراقبة وإدارة جميع الأندية الرياضية المشتركة في المنصة</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Filter Popover Wrapper */}
                    <div className="relative" ref={filterRef}>
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold shadow-sm transition-colors ${filterStatus !== 'ALL' ? 'bg-brand-50 border-brand-200 text-brand-600' : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'}`}
                        >
                            <Filter size={16} />
                            تصفية {filterStatus !== 'ALL' && <span className="w-2 h-2 rounded-full bg-brand-500 inline-block mr-1"></span>}
                        </button>
                        
                        {isFilterOpen && (
                            <div className="absolute left-0 top-12 w-48 bg-white border border-neutral-100 rounded-2xl shadow-lg z-20 overflow-hidden">
                                <div className="p-2 flex flex-col">
                                    <button onClick={() => { setFilterStatus("ALL"); setIsFilterOpen(false); }} className={`flex items-center gap-2 p-2 rounded-lg text-sm font-bold text-right transition-colors ${filterStatus === "ALL" ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50"}`}>
                                        {filterStatus === "ALL" ? <CheckCircle2 size={16} className="text-brand-500" /> : <Circle size={16} className="text-neutral-300" />}
                                        الكل
                                    </button>
                                    <button onClick={() => { setFilterStatus("PENDING"); setIsFilterOpen(false); }} className={`flex items-center gap-2 p-2 rounded-lg text-sm font-bold text-right transition-colors ${filterStatus === "PENDING" ? "bg-orange-50 text-orange-600" : "text-neutral-600 hover:bg-neutral-50"}`}>
                                        {filterStatus === "PENDING" ? <CheckCircle2 size={16} className="text-orange-500" /> : <Circle size={16} className="text-neutral-300" />}
                                        قيد الانتظار
                                    </button>
                                    <button onClick={() => { setFilterStatus("APPROVED"); setIsFilterOpen(false); }} className={`flex items-center gap-2 p-2 rounded-lg text-sm font-bold text-right transition-colors ${filterStatus === "APPROVED" ? "bg-green-50 text-green-600" : "text-neutral-600 hover:bg-neutral-50"}`}>
                                        {filterStatus === "APPROVED" ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-neutral-300" />}
                                        مقبول (نشط)
                                    </button>
                                    <button onClick={() => { setFilterStatus("REJECTED"); setIsFilterOpen(false); }} className={`flex items-center gap-2 p-2 rounded-lg text-sm font-bold text-right transition-colors ${filterStatus === "REJECTED" ? "bg-red-50 text-red-600" : "text-neutral-600 hover:bg-neutral-50"}`}>
                                        {filterStatus === "REJECTED" ? <CheckCircle2 size={16} className="text-red-500" /> : <Circle size={16} className="text-neutral-300" />}
                                        مرفوض/موقوف
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="بحث عن جيم أو مالك..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 w-64 rounded-xl border border-neutral-200 bg-white pr-10 pl-4 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 shadow-sm"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-neutral-700">
                        <thead className="bg-neutral-50 border-b border-neutral-100 text-neutral-500 font-bold">
                            <tr>
                                <th className="px-6 py-4 rounded-tr-3xl">اسم الجيم</th>
                                <th className="px-6 py-4">اسم المالك</th>
                                <th className="px-6 py-4">الإيميل</th>
                                <th className="px-6 py-4 text-center">تاريخ التسجيل</th>
                                <th className="px-6 py-4 text-center">الحالة</th>
                                <th className="px-6 py-4 text-center">عدد الأعضاء</th>
                                <th className="px-6 py-4 rounded-tl-3xl">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium">
                            {filteredGyms.length > 0 ? filteredGyms.map((gym: GymData) => (
                                <tr key={gym.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center font-bold text-sm shrink-0">
                                                {gym.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="font-bold text-neutral-900">{gym.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{gym.owner?.name || 'غير محدد'}</td>
                                    <td className="px-6 py-4 text-neutral-500">{gym.email || gym.owner?.email || '-'}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-center text-xs">{formatDate(gym.createdAt)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                                                gym.status === 'APPROVED' ? 'bg-green-50 text-green-600' : 
                                                gym.status === 'PENDING' ? 'bg-orange-50 text-orange-600' : 
                                                'bg-red-50 text-red-600'
                                            }`}>
                                                {gym.status === 'APPROVED' ? 'مقبول' : gym.status === 'PENDING' ? 'قيد الانتظار' : 'مرفوض/موقوف'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-black text-lg text-neutral-900">{gym._count?.members || 0}</td>
                                    <td className="px-6 py-4">
                                        {gym.status === 'PENDING' ? (
                                            <div className="flex items-center gap-2 justify-center">
                                                <button onClick={() => updateGymStatus(gym.id, 'APPROVED')} className="bg-brand-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-700 transition-colors">قبول</button>
                                                <button onClick={() => updateGymStatus(gym.id, 'REJECTED')} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors">رفض</button>
                                            </div>
                                        ) : (
                                            <div className="text-xs text-neutral-400 text-center">-</div>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-neutral-500">
                                        {searchQuery || filterStatus !== 'ALL' ? 'لا توجد نتائج تطابق البحث والتصفية' : 'لا توجد أندية رياضية مسجلة حالياً'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {filteredGyms.length > 0 && (
                <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between text-sm">
                    <span className="text-neutral-500">عرض {filteredGyms.length} جيم</span>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">
                            <ChevronRight size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold">1</button>
                        <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">
                            <ChevronLeft size={16} />
                        </button>
                    </div>
                </div>
                )}
            </div>
        </>
    );
}
