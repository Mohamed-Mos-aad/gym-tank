"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Filter, ChevronRight, ChevronLeft, MoreVertical, ShieldAlert, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { updateUserStatus } from "@/actions/admin/admin.actions";

type UserData = any;

export default function AdminUsersClient({ initialUsers }: { initialUsers: UserData[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterRole, setFilterRole] = useState<string>("ALL"); // ALL, ADMIN, GYM_OWNER
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const [openActionId, setOpenActionId] = useState<string | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
            // Close actions popover if clicked outside
            if (!(event.target as Element).closest('.actions-container')) {
                setOpenActionId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredUsers = initialUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              user.email.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesRole = filterRole === "ALL" ? true : user.role === filterRole;

        return matchesSearch && matchesRole;
    });

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date(date));
    };

    return (
        <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    {/* Filter Popover */}
                    <div className="relative" ref={filterRef}>
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold shadow-sm transition-colors ${filterRole !== 'ALL' ? 'bg-brand-50 border-brand-200 text-brand-600' : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'}`}
                        >
                            <Filter size={16} />
                            الدور {filterRole !== 'ALL' && <span className="w-2 h-2 rounded-full bg-brand-500 inline-block mr-1"></span>}
                        </button>
                        
                        {isFilterOpen && (
                            <div className="absolute right-0 top-12 w-48 bg-white border border-neutral-100 rounded-2xl shadow-lg z-50 overflow-hidden">
                                <div className="p-2 flex flex-col">
                                    <button onClick={() => { setFilterRole("ALL"); setIsFilterOpen(false); }} className={`flex items-center gap-2 p-2 rounded-lg text-sm font-bold text-right transition-colors ${filterRole === "ALL" ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50"}`}>
                                        {filterRole === "ALL" ? <CheckCircle2 size={16} className="text-brand-500" /> : <Circle size={16} className="text-neutral-300" />}
                                        الكل
                                    </button>
                                    <button onClick={() => { setFilterRole("ADMIN"); setIsFilterOpen(false); }} className={`flex items-center gap-2 p-2 rounded-lg text-sm font-bold text-right transition-colors ${filterRole === "ADMIN" ? "bg-purple-50 text-purple-600" : "text-neutral-600 hover:bg-neutral-50"}`}>
                                        {filterRole === "ADMIN" ? <CheckCircle2 size={16} className="text-purple-500" /> : <Circle size={16} className="text-neutral-300" />}
                                        مدير عام
                                    </button>
                                    <button onClick={() => { setFilterRole("GYM_OWNER"); setIsFilterOpen(false); }} className={`flex items-center gap-2 p-2 rounded-lg text-sm font-bold text-right transition-colors ${filterRole === "GYM_OWNER" ? "bg-blue-50 text-blue-600" : "text-neutral-600 hover:bg-neutral-50"}`}>
                                        {filterRole === "GYM_OWNER" ? <CheckCircle2 size={16} className="text-blue-500" /> : <Circle size={16} className="text-neutral-300" />}
                                        مالك نادي
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="البحث بالاسم أو الإيميل..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 w-64 rounded-xl border border-neutral-200 bg-white pr-10 pl-4 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 shadow-sm"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 min-h-[350px]">
                <div className="overflow-x-auto pb-32">
                    <table className="w-full text-right text-sm text-neutral-700 relative">
                        <thead className="bg-white border-b border-neutral-100 text-neutral-500 font-bold">
                            <tr>
                                <th className="px-6 py-4 rounded-tr-3xl">الاسم</th>
                                <th className="px-6 py-4 text-center">الإيميل</th>
                                <th className="px-6 py-4 text-center">الدور</th>
                                <th className="px-6 py-4 text-center">عدد الجيمات</th>
                                <th className="px-6 py-4 text-center">الحالة</th>
                                <th className="px-6 py-4 text-center rounded-tl-3xl">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium relative">
                            {filteredUsers.length > 0 ? filteredUsers.map((user: UserData) => (
                                <tr key={user.id} className={`transition-colors ${!user.isActive ? 'bg-neutral-50/50 opacity-70' : 'hover:bg-neutral-50'}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 border-2 border-white shadow-sm ${!user.isActive ? 'bg-neutral-200 text-neutral-500' : 'bg-brand-50 text-brand-500'}`}>
                                                {user.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-neutral-900 text-base">{user.name}</div>
                                                <div className="text-xs text-neutral-500">{formatDate(user.createdAt)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-neutral-500">{user.email}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1 w-fit mx-auto ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                            {user.role === 'ADMIN' ? <ShieldAlert size={12} /> : null}
                                            {user.role === 'ADMIN' ? 'مدير عام' : 'مالك نادي'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${!user.isActive ? 'bg-neutral-200 text-neutral-500' : 'bg-neutral-100 text-neutral-700'}`}>
                                            {user._count?.gyms || 0} فروع
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-brand-500' : 'bg-neutral-400'}`}></div>
                                            <span className={`font-bold ${user.isActive ? 'text-brand-500' : 'text-neutral-500'}`}>{user.isActive ? 'نشط' : 'معطل'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center relative actions-container">
                                        <button 
                                            onClick={() => setOpenActionId(openActionId === user.id ? null : user.id)}
                                            className="p-2 rounded-lg text-neutral-400 hover:text-brand-500 hover:bg-brand-50 transition-colors relative z-10"
                                        >
                                            <MoreVertical size={20} />
                                        </button>
                                        
                                        {openActionId === user.id && (
                                            <div className="absolute left-0 top-14 w-40 bg-white border border-neutral-100 rounded-xl shadow-lg z-[60] overflow-hidden">
                                                <div className="flex flex-col p-1">
                                                    {user.isActive ? (
                                                        <button onClick={() => { if(confirm('هل أنت متأكد من تعطيل هذا الحساب؟')) { updateUserStatus(user.id, false); setOpenActionId(null); } }} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-bold w-full text-right">
                                                            <AlertCircle size={16} /> تعطيل الحساب
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => { if(confirm('هل أنت متأكد من تفعيل هذا الحساب؟')) { updateUserStatus(user.id, true); setOpenActionId(null); } }} className="flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors font-bold w-full text-right">
                                                            <CheckCircle2 size={16} /> تفعيل الحساب
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                                        {searchQuery || filterRole !== 'ALL' ? 'لا توجد نتائج تطابق البحث' : 'لا يوجد مستخدمين مسجلين'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {filteredUsers.length > 0 && (
                <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between text-sm bg-white">
                    <span className="text-neutral-500">عرض {filteredUsers.length} مستخدم</span>
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
        </div>
    );
}
