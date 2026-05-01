import { getAuditLogs } from "@/actions/admin/admin.actions";
import { Clock, Shield, Info, Activity } from "lucide-react";

export default async function AuditLogsPage() {
    const logs = await getAuditLogs();

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ar-EG', { 
            dateStyle: 'long', 
            timeStyle: 'short' 
        }).format(new Date(date));
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-black text-neutral-900 mb-2">سجل العمليات</h1>
                <p className="text-sm text-neutral-700">مراقبة كافة الإجراءات الإدارية التي تمت على المنصة.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-neutral-700">
                        <thead className="bg-neutral-50 border-b border-neutral-100 text-neutral-500 font-bold">
                            <tr>
                                <th className="px-6 py-4">العملية</th>
                                <th className="px-6 py-4">التفاصيل</th>
                                <th className="px-6 py-4 text-center">التاريخ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium">
                            {logs.length > 0 ? logs.map((log) => (
                                <tr key={log.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center">
                                                <Activity size={14} />
                                            </div>
                                            <span className="font-bold text-neutral-900">{log.action}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-600">{log.details || "-"}</td>
                                    <td className="px-6 py-4 text-center text-xs text-neutral-400">
                                        <div className="flex items-center justify-center gap-2">
                                            <Clock size={12} />
                                            {formatDate(log.createdAt)}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-neutral-500 italic">
                                        لا توجد عمليات مسجلة حالياً
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
