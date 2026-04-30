import { Search, Filter, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft, MoreVertical, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { getAdminUsers } from "@/actions/admin/admin.actions";

export default async function AdminUsersPage() {
    const users = await getAdminUsers();

    const activeUsersCount = users.filter(u => u.isActive).length;
    const disabledUsersCount = users.filter(u => !u.isActive).length;

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(date);
    };

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
                            placeholder="البحث عن مستخدم..." 
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
                    <div className="text-4xl font-black text-neutral-900 z-10 text-center">{disabledUsersCount}</div>
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
                    <div className="text-4xl font-black text-neutral-900 z-10 text-center">{activeUsersCount}</div>
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-100">
                        <div className="h-full bg-brand-500 w-3/4 rounded-r-full"></div>
                    </div>
                </div>

                <div className="bg-brand-500 text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between h-40 relative overflow-hidden">
                    {/* Abstract circles decoration */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
                    
                    <div className="flex justify-between items-start z-10">
                        <span className="text-brand-50 font-bold text-sm bg-white/10 px-3 py-1 rounded-full">إجمالي النظام</span>
                    </div>
                    <div className="text-center z-10 flex flex-col items-center">
                        <div className="text-5xl font-black mb-1">{users.length}</div>
                        <span className="text-sm font-bold text-brand-100">مستخدم مسجل</span>
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
                                <th className="px-6 py-4 text-center">الدور</th>
                                <th className="px-6 py-4 text-center">عدد الجيمات</th>
                                <th className="px-6 py-4 text-center">الحالة</th>
                                <th className="px-6 py-4 text-center rounded-tl-3xl">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium">
                            {users.length > 0 ? users.map((user) => (
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
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-2 rounded-lg text-neutral-400 hover:text-brand-500 hover:bg-brand-50 transition-colors">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                                        لا يوجد مستخدمين مسجلين
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {users.length > 0 && (
                <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between text-sm bg-white">
                    <span className="text-neutral-500">عرض {users.length} مستخدم</span>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 cursor-not-allowed">
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

