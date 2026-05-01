import { getAdminGymById } from "@/actions/admin/admin.actions";
import AdminGymDetailsClient from "@/components/admin/AdminGymDetailsClient";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AdminGymDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const gym = await getAdminGymById(id);

    if (!gym) {
        return notFound();
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-500">
                <Link href="/admin" className="hover:text-brand-500 transition-colors">
                    <Home size={16} />
                </Link>
                <ChevronRight size={14} />
                <Link href="/admin/gyms" className="hover:text-brand-500 transition-colors">إدارة الجيمات</Link>
                <ChevronRight size={14} />
                <span className="text-neutral-900">{gym.name}</span>
            </div>

            <AdminGymDetailsClient initialGym={gym} />
        </div>
    );
}
