"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle2, Circle, Trash2, Clock, Filter, CheckCircle, AlertTriangle, Info, Zap } from "lucide-react";
import { getAdminNotifications, markNotificationAsRead, markAllAdminNotificationsAsRead, sendBroadcastNotification } from "@/actions/notifications.actions";
import { getAdminUsers } from "@/actions/admin/admin.actions";
import Toast from "@/components/ui/Toast";

type NotificationData = {
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    type: string;
    createdAt: Date;
};

export default function AdminNotificationsPage() {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<"ALL" | "UNREAD">("ALL");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [sendData, setSendData] = useState({ title: "", message: "", target: "ALL" });
    const [isSending, setIsSending] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const [notifData, userData] = await Promise.all([
                getAdminNotifications(),
                getAdminUsers()
            ]);
            setNotifications(notifData);
            setUsers(userData);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleMarkAsRead = async (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
        await markNotificationAsRead(id);
    };

    const handleMarkAllAsRead = async () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        await markAllAdminNotificationsAsRead();
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        const result = await sendBroadcastNotification(sendData);
        if (result.success) {
            setIsModalOpen(false);
            setSendData({ title: "", message: "", target: "ALL" });
            const data = await getAdminNotifications();
            setNotifications(data);
            setToast({ message: "تم إرسال الإشعار بنجاح ✅", type: "success" });
        } else {
            setToast({ message: "فشل إرسال الإشعار", type: "error" });
        }
        setIsSending(false);
    };

    const formatNotifDate = (date: Date) => {
        return new Intl.DateTimeFormat('ar-EG', { 
            dateStyle: 'long', 
            timeStyle: 'short' 
        }).format(new Date(date));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "GYM_REGISTRATION": return <Zap className="text-orange-500" size={18} />;
            case "SUBSCRIPTION": return <CheckCircle className="text-brand-500" size={18} />;
            case "SYSTEM": return <Info className="text-blue-500" size={18} />;
            default: return <Bell className="text-neutral-400" size={18} />;
        }
    };

    const filteredNotifs = filter === "ALL" 
        ? notifications 
        : notifications.filter(n => !n.isRead);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 mb-2">مركز الإشعارات</h1>
                    <p className="text-sm text-neutral-700">تابع أحدث النشاطات أو أرسل تنبيهات جديدة للأندية.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-brand-500 text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-brand-500/20 hover:bg-brand-700 transition-all flex items-center gap-2"
                    >
                        <Zap size={16} />
                        إرسال تنبيه جديد
                    </button>
                    <div className="h-8 w-[1px] bg-neutral-200 mx-2 hidden sm:block"></div>
                    <button 
                        onClick={handleMarkAllAsRead}
                        className="text-sm font-bold text-brand-500 hover:underline"
                    >
                        تحديد الكل كمقروء
                    </button>
                    <div className="flex bg-neutral-100 p-1 rounded-xl">
                        <button 
                            onClick={() => setFilter("ALL")}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === "ALL" ? "bg-white text-brand-500 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
                        >
                            الكل
                        </button>
                        <button 
                            onClick={() => setFilter("UNREAD")}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === "UNREAD" ? "bg-white text-brand-500 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
                        >
                            غير المقروء
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                        <div key={i} className="h-24 w-full bg-white rounded-3xl animate-pulse border border-neutral-100"></div>
                    ))
                ) : filteredNotifs.length > 0 ? (
                    filteredNotifs.map((notif) => (
                        <div 
                            key={notif.id} 
                            onClick={() => !notif.isRead && handleMarkAsRead(notif.id)}
                            className={`group relative bg-white rounded-3xl p-6 shadow-sm border transition-all cursor-pointer ${!notif.isRead ? 'border-brand-100 hover:border-brand-300' : 'border-neutral-100 opacity-80 hover:opacity-100'}`}
                        >
                            <div className="flex gap-5 items-start">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${!notif.isRead ? 'bg-brand-50' : 'bg-neutral-50'}`}>
                                    {getIcon(notif.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`text-base font-bold truncate ${!notif.isRead ? 'text-neutral-900' : 'text-neutral-600'}`}>
                                            {notif.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400">
                                            <Clock size={12} />
                                            {formatNotifDate(notif.createdAt)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-neutral-500 leading-relaxed max-w-3xl">
                                        {notif.message}
                                    </p>
                                </div>
                                {!notif.isRead && (
                                    <div className="absolute top-6 left-6">
                                        <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(0,223,129,0.5)]"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-neutral-200">
                        <div className="w-20 h-20 rounded-full bg-neutral-50 flex items-center justify-center mx-auto mb-6">
                            <Bell className="text-neutral-300" size={32} />
                        </div>
                        <h2 className="text-xl font-black text-neutral-900 mb-2">لا توجد إشعارات</h2>
                        <p className="text-sm text-neutral-500">أنت الآن على علم بكل شيء، لا توجد تنبيهات جديدة حالياً.</p>
                    </div>
                )}
            </div>

            {/* Send Notification Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-neutral-100 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-neutral-50 bg-neutral-50/50">
                            <h2 className="text-xl font-black text-neutral-900">إرسال تنبيه جديد</h2>
                            <p className="text-sm text-neutral-500 mt-1">سيتم إرسال هذا التنبيه للمستخدمين المختارين فوراً.</p>
                        </div>
                        <form onSubmit={handleSend} className="p-8 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-neutral-700">المستهدف</label>
                                <select 
                                    value={sendData.target}
                                    onChange={(e) => setSendData({ ...sendData, target: e.target.value })}
                                    className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors"
                                >
                                    <option value="ALL">جميع المستخدمين</option>
                                    <optgroup label="مستخدم محدد">
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-neutral-700">عنوان التنبيه</label>
                                <input 
                                    type="text" 
                                    required
                                    value={sendData.title}
                                    onChange={(e) => setSendData({ ...sendData, title: e.target.value })}
                                    className="w-full h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors"
                                    placeholder="مثلاً: تحديث فني في النظام"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-neutral-700">محتوى الرسالة</label>
                                <textarea 
                                    required
                                    value={sendData.message}
                                    onChange={(e) => setSendData({ ...sendData, message: e.target.value })}
                                    className="w-full h-32 bg-neutral-50 border border-neutral-100 rounded-xl p-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                                    placeholder="اكتب تفاصيل التنبيه هنا..."
                                />
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button 
                                    type="submit"
                                    disabled={isSending}
                                    className="flex-1 bg-brand-500 text-white h-12 rounded-2xl font-black shadow-lg shadow-brand-500/20 hover:bg-brand-700 transition-all flex items-center justify-center gap-2"
                                >
                                    {isSending ? "جاري الإرسال..." : "إرسال الآن"}
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-neutral-100 text-neutral-700 h-12 rounded-2xl font-black hover:bg-neutral-200 transition-all"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
