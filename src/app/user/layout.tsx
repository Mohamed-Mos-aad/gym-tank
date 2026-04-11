// ** Hooks && Tools
import React from "react";
// ** Layouts
import UserLayout from "@/layouts/UserLayout";



export default function Layout({ children }: { children: React.ReactNode }) {
    return <UserLayout>{children}</UserLayout>;
}