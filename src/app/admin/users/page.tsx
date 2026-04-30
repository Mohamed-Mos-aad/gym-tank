import { AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import { getAdminUsers } from "@/actions/admin/admin.actions";
import AdminUsersClient from "@/components/admin/AdminUsersClient";

export default async function AdminUsersPage() {
    const users = await getAdminUsers();

    const activeUsersCount = users.filter(u => u.isActive).length;
    const disabledUsersCount = users.filter(u => !u.isActive).length;
    
    // Calculate percentages for the progress bars
    const totalCount = users.length || 1; // Prevent division by zero
    const activePercent = Math.round((activeUsersCount / totalCount) * 100);
    const disabledPercent = Math.round((disabledUsersCount / totalCount) * 100);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="text-xs font-bold text-brand-500 mb-1 block">الإدارة العامة</span>
                    <h1 className="text-3xl font-black text-neutral-900 mb-2">المستخدمين</h1>
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
                        <div className="h-full bg-orange-600 rounded-r-full transition-all duration-1000" style={{ width: `${disabledPercent}%` }}></div>
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
                        <div className="h-full bg-brand-500 rounded-r-full transition-all duration-1000" style={{ width: `${activePercent}%` }}></div>
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

            {/* Client Component for Interactive Table (Search & Filter & Actions) */}
            <AdminUsersClient initialUsers={users} />
        </div>
    );
}

