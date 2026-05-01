"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle2, Circle, Trash2, Clock, Filter, CheckCircle, AlertTriangle, Info, Zap } from "lucide-react";
import { getAdminNotifications, markNotificationAsRead, markAllAdminNotificationsAsRead } from "@/actions/notifications.actions";

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

    useEffect(() => {
        const fetchNotifs = async () => {
            const data = await getAdminNotifications();
            setNotifications(data);
            setIsLoading(false);
        };
        fetchNotifs();
    }, []);

    const handleMarkAsRead = async (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
        await markNotificationAsRead(id);
    };

    const handleMarkAllAsRead = async () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        await markAllAdminNotificationsAsRead();
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
                    <p className="text-sm text-neutral-700">تابع أحدث النشاطات والتنبيهات الخاصة بالنظام والأندية.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleMarkAllAsRead}
                        className="text-sm font-bold text-brand-500 hover:underline"
                    >
                        تحديد الكل كمقروء
                    </button>
                    <div className="h-4 w-[1px] bg-neutral-200 mx-2"></div>
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
        </div>
    );
}
