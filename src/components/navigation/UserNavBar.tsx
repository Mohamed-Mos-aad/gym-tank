"use client";

// ** Assets
import { Bell, Menu, Search, User } from "lucide-react";

// ** Interfaces
interface UserNavBarProps {
    onMenuToggle: () => void;
}

export default function UserNavBar({ onMenuToggle }: UserNavBarProps) {
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

                <div className="relative w-full max-w-xl">
                    <Search size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-700" />
                    <input
                        type="search"
                        className="w-full rounded-xl border border-brand-700/10 bg-neutral-100 py-2.5 pr-10 pl-4 text-[14px] text-neutral-900 placeholder:text-neutral-700/70 focus:border-brand-500 focus:bg-white"
                        placeholder="بحث عن عضو، اشتراك..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
                <button
                    type="button"
                    aria-label="Notifications"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-700/10 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-brand-500"
                >
                    <Bell size={18} />
                </button>
                <div className="hidden text-right sm:block">
                    <h1 className="text-[14px] font-bold text-neutral-900">أحمد علي</h1>
                    <h2 className="text-[10px] text-neutral-700">مدير النظام</h2>
                </div>
                <button
                    type="button"
                    aria-label="User profile"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-white transition-opacity hover:opacity-90"
                >
                    <User size={16} />
                </button>
            </div>
        </nav>
    );
}
