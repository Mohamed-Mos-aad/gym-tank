// ** Hooks && Tools
import React from "react";
// ** Components
import SideNavBar from "@/components/navigation/SideNavBar";
import UserNavBar from "@/components/navigation/UserNavBar";



export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full min-h-screen flex items-start bg-[#F8F9FB]">
            <SideNavBar />
            <div className="w-full mr-64">
                <UserNavBar />
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}