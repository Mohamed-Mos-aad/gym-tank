// ** Hooks && Tools
import React from "react";



export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full bg-[#F5F7F9] m-auto">
            {children}
        </div>
    );
}