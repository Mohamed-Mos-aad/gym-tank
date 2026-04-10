"use client";

// ** Hooks && Tools
import { useState } from "react";
import Link from "next/link";
// ** Assets
import { Menu, X } from "lucide-react";

const navItems = [
    { href: "#home", label: "الرئيسية" },
    { href: "#features", label: "المميزات" },
    { href: "#pricing", label: "الأسعار" },
    { href: "#contact", label: "اتصل بنا" },
];

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const ctaBaseClass = "inline-flex items-center justify-center rounded-xl px-6 py-2 text-[16px] font-black shadow transition-colors duration-200";

    return (
        <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-neutral-50/95 backdrop-blur">
            <nav className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
                <Link href="#home" className="text-2xl font-black text-brand-500">جيم تانك</Link>

                <ul className="hidden items-center gap-8 text-[16px] font-bold text-neutral-700 lg:flex">
                    {navItems.map(({ href, label }, index) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`${index === 0 ? "text-brand-500" : ""} transition-colors hover:text-brand-500`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center gap-3 lg:flex">
                    <Link href="/" className={`${ctaBaseClass} bg-white text-brand-500 hover:bg-neutral-100`}>تسجيل الدخول</Link>
                    <Link href="/" className={`${ctaBaseClass} bg-brand-500 text-white hover:bg-brand-500/90`}>ابدأ الآن</Link>
                </div>

                <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-neutral-900 shadow lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {isMenuOpen && (
                    <div className="absolute inset-x-4 top-[calc(100%+12px)] rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow-xl lg:hidden">
                        <ul className="flex flex-col gap-2 text-[16px] font-bold text-neutral-700">
                            {navItems.map(({ href, label }, index) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`${index === 0 ? "text-brand-500" : ""} block rounded-lg px-3 py-2 transition-colors hover:bg-neutral-100 hover:text-brand-500`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex flex-col gap-2">
                            <Link href="/" className={`${ctaBaseClass} w-full bg-white text-brand-500 hover:bg-neutral-100`}>تسجيل الدخول</Link>
                            <Link href="/" className={`${ctaBaseClass} w-full bg-brand-500 text-white hover:bg-brand-500/90`}>ابدأ الآن</Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
