"use client";

// ** Hooks && Tools
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// ** Assets
import { CreditCard, Dumbbell, LayoutDashboard, LogOut, Settings, UsersRound, X, Plus } from "lucide-react";

// ** Interfaces
interface AdminSideNavBarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
    { href: "/admin/gyms", label: "إدارة النوادي", icon: Dumbbell },
    { href: "/admin/users", label: "المستخدمين", icon: UsersRound },
    { href: "/admin/subscriptions", label: "الاشتراكات", icon: CreditCard },
    { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export default function AdminSideNavBar({ isOpen, onClose }: AdminSideNavBarProps) {
    // ** Hooks && Tools
    const pathname = usePathname();
    const router = useRouter();

    // ** Handlers
    const logOutHandler = () => {
        router.push('/');
        onClose();
    }

    return (
        <nav
            className={`fixed top-0 right-0 z-40 flex h-screen w-72 max-w-[85vw] flex-col gap-8 border-l border-brand-700/10 bg-white px-4 py-6 shadow-xl transition-transform duration-300 lg:w-64 lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h1 className="text-[24px] font-black text-brand-500">جيم تانك</h1>
                    <h2 className="text-[10px] text-neutral-700">إدارة النظام</h2>
                </div>
                <button
                    type="button"
                    aria-label="Close sidebar"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-brand-500 lg:hidden"
                    onClick={onClose}
                >
                    <X size={18} />
                </button>
            </div>

            <ul className="flex flex-1 flex-col gap-1.5 text-neutral-700">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = href !== "#" && pathname === href;

                    return (
                        <li key={label}>
                            <Link
                                href={href}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${isActive ? "bg-brand-50 text-brand-500 font-bold" : "hover:bg-neutral-100 hover:text-brand-500"}`}
                                onClick={onClose}
                            >
                                <Icon size={18} />
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className="mt-auto flex flex-col gap-2">
                <button
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-warn-700 transition-colors hover:bg-neutral-100 font-bold"
                    onClick={logOutHandler}
                >
                    <LogOut size={18} className="rotate-180" />
                    تسجيل الخروج
                </button>
            </div>
        </nav>
    );
}
