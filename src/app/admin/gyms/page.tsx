import { Search, Filter, HelpCircle, ChevronRight, ChevronLeft, Dumbbell, Waves, Zap, Building2 } from "lucide-react";
import Link from "next/link";
import { getAdminGyms, updateGymStatus } from "@/actions/admin/admin.actions";
import AdminGymsClient from "@/components/admin/AdminGymsClient";

export default async function AdminGymsPage() {
    const gyms = await getAdminGyms();

    const pendingGymsCount = gyms.filter(g => g.status === 'PENDING').length;
    const activeGymsCount = gyms.filter(g => g.status === 'APPROVED').length;
    const activePercentage = gyms.length > 0 ? Math.round((activeGymsCount / gyms.length) * 100) : 0;

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(date);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Client Component for Interactive Table (Search & Filter) */}
            <AdminGymsClient initialGyms={gyms} />

            {/* Bottom Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-200 flex flex-col justify-center items-start gap-4">
                    <h2 className="text-xl font-black text-neutral-900">تحتاج لمساعدة؟</h2>
                    <p className="text-sm text-neutral-600">فريق الدعم الفني متوفر دائماً لمساعدتك في إدارة شؤون المنصة وتسريع عمليات القبول.</p>
                    <button className="bg-brand-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-brand-700 transition-colors mt-2">
                        تواصل معنا
                    </button>
                </div>
                <div className="rounded-3xl overflow-hidden relative min-h-[160px] bg-brand-700 p-6 flex flex-col justify-center border border-neutral-200">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <div className="relative z-10 text-white">
                        <h2 className="text-2xl font-black mb-2">أعلى النوادي تقييماً</h2>
                        <p className="text-sm opacity-90 max-w-sm">تعرف على النوادي الأكثر نشاطاً وتفاعلاً من قبل الأعضاء خلال هذا الشهر</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

