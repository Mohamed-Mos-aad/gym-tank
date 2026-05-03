"use client";

// ** Hooks && Tools
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
// ** Assets
import { Bell, Menu, CheckCircle2, Circle, User as UserIcon } from "lucide-react";
// ** Actions
import { getUserNotifications, markNotificationAsRead, markAllUserNotificationsAsRead } from "@/actions/notifications.actions";
import { getCurrentUserAction } from "@/actions/user.actions";

// ** Interfaces
interface UserNavBarProps {
    onMenuToggle: () => void;
}

type NotificationData = any;

export default function UserNavBar({ onMenuToggle }: UserNavBarProps) {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const [notifs, userData] = await Promise.all([
                getUserNotifications(),
                getCurrentUserAction()
            ]);
            setNotifications(notifs);
            setUser(userData);
        };
        fetchData();

        // Poll for new notifications every 30 seconds
        const interval = setInterval(async () => {
            const notifs = await getUserNotifications();
            setNotifications(notifs);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMarkAsRead = async (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
        await markNotificationAsRead(id);
    };

    const handleMarkAllAsRead = async () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        await markAllUserNotificationsAsRead();
    };

    const formatNotifDate = (date: Date) => {
        return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(date));
    };

    return (
        <nav className="sticky top-0 z-30 flex w-full items-center justify-between gap-3 border-b border-brand-700/10 bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
            <div className="flex flex-1 items-center gap-3">
                <button
                    type="button"
                    aria-label="Open sidebar"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-700/10 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-brand-500 lg:hidden"
                    onClick={onMenuToggle}
                >
                    <Menu size={20} />
                </button>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 relative">
                {/* Notifications Popover Wrapper */}
                <div ref={notifRef} className="relative">
                    <button
                        type="button"
                        aria-label="Notifications"
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${isNotifOpen ? 'bg-brand-50 text-brand-500' : 'text-neutral-700 hover:bg-neutral-100 hover:text-brand-500'}`}
                    >
                        <Bell size={18} />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-red-500">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                            </span>
                        )}
                    </button>

                    {/* Popover Content */}
                    {isNotifOpen && (
                        <div className="fixed left-4 right-4 top-16 sm:absolute sm:left-[-16px] sm:right-auto sm:top-12 sm:w-[320px] max-w-[400px] bg-white border border-neutral-100 rounded-2xl shadow-xl z-50 overflow-hidden transform origin-top transition-all mx-auto">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
                                <h3 className="font-bold text-neutral-900 text-sm">الإشعارات</h3>
                                {unreadCount > 0 && (
                                    <button onClick={handleMarkAllAsRead} className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors">
                                        تحديد الكل كمقروء
                                    </button>
                                )}
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <div key={notif.id} className={`flex gap-3 p-4 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors cursor-pointer ${!notif.isRead ? 'bg-brand-50/30' : ''}`} onClick={() => handleMarkAsRead(notif.id)}>
                                            <div className="mt-0.5 shrink-0">
                                                {!notif.isRead ? (
                                                    <Circle size={10} className="fill-brand-500 text-brand-500" />
                                                ) : (
                                                    <CheckCircle2 size={14} className="text-neutral-400" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-sm ${!notif.isRead ? 'font-bold text-neutral-900' : 'text-neutral-700'}`}>{notif.title}</p>
                                                <p className="text-xs text-neutral-500 mt-1">{notif.message}</p>
                                                <p className="text-[10px] text-neutral-400 mt-1">{formatNotifDate(notif.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-neutral-500 text-sm">
                                        لا توجد إشعارات حالياً
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="hidden text-right sm:block border-r border-neutral-200 pr-4 ml-2">
                    <h1 className="text-[14px] font-bold text-neutral-900">{user?.name || "تحميل..."}</h1>
                    <h2 className="text-[10px] text-neutral-700">مالك نادي</h2>
                </div>
                
                <Link href="/user/setting" className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm flex items-center justify-center bg-brand-700 text-white font-bold hover:bg-brand-800 transition-colors">
                    {user?.name?.substring(0, 1).toUpperCase() || <UserIcon size={16} />}
                </Link>
            </div>
        </nav>
    );
}
