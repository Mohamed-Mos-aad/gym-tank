"use client";

// ** Hooks && Tools
import { useEffect, useState } from "react";
// ** Components
import AdminSideNavBar from "@/components/navigation/AdminSideNavBar";
import AdminNavBar from "@/components/navigation/AdminNavBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const closeSidebarOnDesktop = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(false);
            }
        };

        closeSidebarOnDesktop();
        window.addEventListener("resize", closeSidebarOnDesktop);

        return () => window.removeEventListener("resize", closeSidebarOnDesktop);
    }, []);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-neutral-50 lg:pr-64" dir="rtl">
            <AdminSideNavBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {isSidebarOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar overlay"
                    className="fixed inset-0 z-30 bg-brand-700/25 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="w-full">
                <AdminNavBar onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
