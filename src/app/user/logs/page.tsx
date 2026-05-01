import { getUserLogsAction } from "@/actions/user/gym.actions";
import { History, Search, Filter } from "lucide-react";

export default async function UserLogsPage() {
    const logs = await getUserLogsAction();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-neutral-900">سجل العمليات</h1>
                <p className="text-sm text-neutral-700">تتبع كافة التحركات والتغييرات التي تمت على حسابك وفروعك.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
                <div className="p-6 border-b border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <input 
                            type="text" 
                            placeholder="البحث في العمليات..." 
                            className="w-full h-11 bg-neutral-50 border border-neutral-100 rounded-xl px-10 text-sm font-bold outline-none focus:border-brand-500 transition-colors"
                        />
                        <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 text-neutral-600 border border-neutral-100 font-bold text-sm hover:bg-neutral-100 transition-colors">
                        <Filter size={16} />
                        تصفية النتائج
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm">
                        <thead className="bg-neutral-50 text-neutral-500 font-bold">
                            <tr>
                                <th className="py-4 px-6">العملية</th>
                                <th className="py-4 px-6">التفاصيل</th>
                                <th className="py-4 px-6 text-center">التاريخ والوقت</th>
                                <th className="py-4 px-6 text-center">عنوان IP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                            {logs.length > 0 ? logs.map((log) => (
                                <tr key={log.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                                                <History size={18} />
                                            </div>
                                            <span className="font-black text-neutral-900">{log.action}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 text-neutral-600 font-bold max-w-xs truncate">
                                        {log.details || "---"}
                                    </td>
                                    <td className="py-5 px-6 text-center font-bold text-neutral-500">
                                        {new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(log.createdAt))}
                                    </td>
                                    <td className="py-5 px-6 text-center font-mono text-xs text-neutral-400">
                                        {log.ipAddress || "---"}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center text-neutral-400 font-bold">
                                        لا توجد عمليات مسجلة حالياً.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
