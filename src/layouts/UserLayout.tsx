// ** Hooks && Tools
import Link from "next/link";
import React from "react";
// ** Components
import UserNavBar from "@/components/navigation/UserNavBar";



export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full min-h-screen flex items-start bg-[#F8FAFC]">
            <section className="w-64 min-h-screen flex flex-col gap-10 border border-[#C7C4D8]/15 px-4 py-6 relative">
                <div>
                    <h1 className="text-[24px] font-black text-brand-500">جيم تانك</h1>
                    <h2 className="text-[10px] text-neutral-700">إدارة الجيم الذكية</h2>
                </div>
                <ul className="flex flex-col gap-2 text-[#64748B]">
                    <li>
                        <Link href={""} className="flex items-center gap-3 bg-[#EEF2FF]/50 rounded-lg px-4 py-3 font-bold text-brand-500">لوحة القيادة</Link>
                    </li>
                    <li>
                        <Link href={""} className="flex items-center gap-3 px-4 py-3">الأعضاء</Link>
                    </li>
                    <li>
                        <Link href={""} className="flex items-center gap-3 px-4 py-3">الاشتراكات</Link>
                    </li>
                    <li>
                        <Link href={""} className="flex items-center gap-3 px-4 py-3">الإعدادات</Link>
                    </li>
                </ul>
                <Link href={"/"} className="flex items-center gap-3 text-[16px] text-[#64748B] px-4 py-3 absolute bottom-3">تسجيل الخروج</Link>
            </section>
            <div className="w-full">
                <UserNavBar />
                {children}
            </div>
        </div>
    );
}