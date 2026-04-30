// ** Assets
import { Bell, Menu, Search, Settings } from "lucide-react";
import Image from "next/image";

// ** Interfaces
interface AdminNavBarProps {
    onMenuToggle: () => void;
}

export default function AdminNavBar({ onMenuToggle }: AdminNavBarProps) {
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
                <div className="hidden items-center gap-2 lg:flex">
                    <span className="text-xl font-bold text-brand-500 mr-2">GymTank</span>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="بحث سريع..." 
                            className="h-10 w-64 rounded-xl border-none bg-neutral-100 pr-10 pl-4 text-sm outline-none focus:ring-2 focus:ring-brand-500/20"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
                <button
                    type="button"
                    aria-label="Notifications"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-brand-500"
                >
                    <Bell size={18} />
                </button>
                <button
                    type="button"
                    aria-label="Settings"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-brand-500"
                >
                    <Settings size={18} />
                </button>
                <div className="hidden text-right sm:block">
                    <h1 className="text-[14px] font-bold text-neutral-900">أحمد المدير</h1>
                    <h2 className="text-[10px] text-neutral-700">مدير النظام</h2>
                </div>
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
                    {/* Placeholder for user image, matching the design */}
                    <div className="flex h-full w-full items-center justify-center bg-brand-700 text-white">
                        أ
                    </div>
                </div>
            </div>
        </nav>
    );
}
