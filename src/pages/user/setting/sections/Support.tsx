import { HelpCircle } from "lucide-react";
import Link from "next/link";

export default function Support() {
    return (
        <Link 
            href="/user/support"
            className="relative flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-neutral-200 p-8 text-center hover:border-brand-300 hover:bg-brand-50/30 transition-all group"
        >
            <div className="w-12 h-12 rounded-full bg-neutral-100 group-hover:bg-brand-100 flex items-center justify-center text-neutral-400 group-hover:text-brand-500 transition-colors">
                <HelpCircle size={24} />
            </div>
            <h2 className="text-sm font-bold text-neutral-600 group-hover:text-brand-600 transition-colors">هل تحتاج إلى مساعدة في الإعدادات؟</h2>
            <span className="text-xs font-black text-brand-500">تحدث مع الدعم الفني ←</span>
        </Link>
    )
}