// ** Hooks && Tools
import React from "react";
// ** Layouts
import AuthLayout from "@/layouts/AuthLayout";



export default function Layout({ children }: { children: React.ReactNode }) {
    return <AuthLayout>{children}</AuthLayout>;
}