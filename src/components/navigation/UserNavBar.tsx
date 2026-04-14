// ** Assets
import { Bell, Menu, User } from "lucide-react";

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
