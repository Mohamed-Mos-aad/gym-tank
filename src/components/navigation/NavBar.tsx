"use client";

// ** Hooks && Tools
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUserAction } from "@/actions/user.actions";
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
    const [activeSection, setActiveSection] = useState("home");
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const ctaBaseClass = "inline-flex items-center justify-center rounded-xl px-6 py-2 text-[16px] font-black shadow transition-colors duration-200";

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUserAction();
                setUser(currentUser);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const sectionIds = navItems.map((item) => item.href.replace("#", ""));
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null);

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter((entry) => entry.isIntersecting);
                if (!visibleEntries.length) return;

                const mostVisibleEntry = visibleEntries.reduce((bestEntry, currentEntry) => {
                    return currentEntry.intersectionRatio > bestEntry.intersectionRatio
                        ? currentEntry
                        : bestEntry;
                });

                setActiveSection(mostVisibleEntry.target.id);
            },
            {
                threshold: [0.2, 0.4, 0.6, 0.8],
                rootMargin: "-15% 0px -55% 0px",
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-neutral-50/95 backdrop-blur">
            <nav className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
                <Link href="#home" className="text-2xl font-black text-brand-500">جيم تانك</Link>

                <ul className="hidden items-center gap-8 text-[16px] font-bold text-neutral-700 lg:flex">
                    {navItems.map(({ href, label }) => {
                        const isActive = activeSection === href.replace("#", "");

                        return (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`${isActive ? "text-brand-500" : ""} transition-colors hover:text-brand-500`}
                                onClick={() => setActiveSection(href.replace("#", ""))}
                            >
                                {label}
                            </Link>
                        </li>
                        )
                    })}
                </ul>

                <div className="hidden items-center gap-3 lg:flex">
                    {loading ? (
                        <div className="h-10 w-24 animate-pulse rounded-xl bg-neutral-200" />
                    ) : user ? (
                        <Link
                            href={user.role === "ADMIN" ? "/admin" : "/user"}
                            className={`${ctaBaseClass} bg-brand-500 text-white hover:bg-brand-500/90`}
                        >
                            لوحة التحكم
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className={`${ctaBaseClass} bg-white text-brand-500 hover:bg-neutral-100`}>تسجيل الدخول</Link>
                            <Link href="/" className={`${ctaBaseClass} bg-brand-500 text-white hover:bg-brand-500/90`}>ابدأ الآن</Link>
                        </>
                    )}
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
                            {navItems.map(({ href, label }) => {
                                const isActive = activeSection === href.replace("#", "");

                                return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`${isActive ? "bg-brand-50 text-brand-500" : ""} block rounded-lg px-3 py-2 transition-colors hover:bg-neutral-100 hover:text-brand-500`}
                                        onClick={() => {
                                            setActiveSection(href.replace("#", ""));
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        {label}
                                    </Link>
                                </li>
                                )
                            })}
                        </ul>
                        <div className="mt-4 flex flex-col gap-2">
                            {loading ? (
                                <div className="h-10 w-full animate-pulse rounded-xl bg-neutral-200" />
                            ) : user ? (
                                <Link
                                    href={user.role === "ADMIN" ? "/admin" : "/user"}
                                    className={`${ctaBaseClass} w-full bg-brand-500 text-white hover:bg-brand-500/90`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    لوحة التحكم
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className={`${ctaBaseClass} w-full bg-white text-brand-500 hover:bg-neutral-100`}>تسجيل الدخول</Link>
                                    <Link href="/" className={`${ctaBaseClass} w-full bg-brand-500 text-white hover:bg-brand-500/90`}>ابدأ الآن</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

