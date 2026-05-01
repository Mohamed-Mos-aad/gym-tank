"use client";

// ** Hooks && Tools
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// ** Assets
import { 
    CreditCard, 
    LayoutDashboard, 
    LogOut, 
    Settings, 
    UsersRound, 
    X, 
    ReceiptText, 
    HelpCircle, 
    History,
    Dumbbell
} from "lucide-react";
import { logoutUserAction } from "@/actions/user.actions";
import { getGymAction } from "@/actions/user/gym.actions";

// ** Interfaces
interface SideNavBarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    { href: "/user", label: "لوحة القيادة", icon: LayoutDashboard },
    { href: "/user/members", label: "الأعضاء", icon: UsersRound },
    { href: "/user/subscribes", label: "الاشتراكات", icon: CreditCard },
    { href: "/user/billing", label: "اشتراك المنصة", icon: ReceiptText },
    { href: "/user/logs", label: "سجل العمليات", icon: History },
    { href: "/user/support", label: "الدعم الفني", icon: HelpCircle },
    { href: "/user/setting", label: "الإعدادات", icon: Settings },
];

export default function SideNavBar({ isOpen, onClose }: SideNavBarProps) {
    // ** Hooks && Tools
    const pathname = usePathname();
    const router = useRouter();
    const [gymName, setGymName] = useState("جيم تانك");

    useEffect(() => {
        const fetchGym = async () => {
            try {
                const gym = await getGymAction();
                if (gym) setGymName(gym.name);
            } catch (error) {
                console.error("Error fetching gym name");
            }
        };
        fetchGym();
    }, []);

    // ** Handlers
    const logOutHandler = async (e: React.MouseEvent) => {
        e.preventDefault();
        await logoutUserAction();
        router.push('/login');
        onClose();
    }

    return (
        <nav
            className={`fixed top-0 right-0 z-40 flex h-screen w-72 max-w-[85vw] flex-col gap-8 border-l border-brand-700/10 bg-white px-4 py-6 shadow-xl transition-transform duration-300 lg:w-64 lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="flex items-start justify-between gap-3 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                        <Dumbbell size={20} />
                    </div>
                    <div>
                        <h1 className="text-[18px] font-black text-neutral-900 truncate max-w-[140px]">{gymName}</h1>
                        <h2 className="text-[10px] font-bold text-brand-500 uppercase tracking-wider">نظام الإدارة</h2>
                    </div>
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

            <ul className="flex flex-1 flex-col gap-1.5 px-2 overflow-y-auto custom-scrollbar">
                <div className="text-[10px] font-black text-neutral-400 mb-2 px-2 uppercase tracking-widest">القائمة الرئيسية</div>
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;

                    return (
                        <li key={label}>
                            <Link
                                href={href}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${isActive ? "bg-brand-50 text-brand-500 font-bold shadow-sm" : "text-neutral-600 hover:bg-neutral-50 hover:text-brand-500"}`}
                                onClick={onClose}
                            >
                                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-sm">{label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className="px-2 mt-auto border-t border-neutral-100 pt-6">
                <button
                    onClick={logOutHandler}
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition-all hover:bg-red-50 font-bold"
                >
                    <LogOut size={18} />
                    <span className="text-sm">تسجيل الخروج</span>
                </button>
            </div>
        </nav>
    );
}
