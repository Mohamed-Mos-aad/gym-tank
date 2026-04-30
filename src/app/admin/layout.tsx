import AdminLayout from "@/layouts/AdminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "GymTank - Admin",
    description: "System Administration Dashboard for GymTank",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <AdminLayout>{children}</AdminLayout>;
}
