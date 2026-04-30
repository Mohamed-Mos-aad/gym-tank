import { Search, Filter, HelpCircle, ChevronRight, ChevronLeft, Dumbbell, Waves, Zap, Building2 } from "lucide-react";
import Link from "next/link";
import { getAdminGyms, updateGymStatus } from "@/actions/admin/admin.actions";

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-neutral-900 mb-1">إدارة الجيمات</h1>
                    <p className="text-sm text-neutral-700">مراقبة وإدارة جميع الأندية الرياضية المشتركة في المنصة</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-700 shadow-sm hover:bg-neutral-50 transition-colors">
                        <Filter size={16} />
                        تصفية
                    </button>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="بحث عن جيم..." 
                            className="h-10 w-64 rounded-xl border border-neutral-200 bg-white pr-10 pl-4 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 shadow-sm"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-bold text-brand-500 mb-2">إجمالي النوادي</div>
                        <div className="flex items-end gap-2">
                            <div className="text-4xl font-black text-neutral-900">{gyms.length}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-bold text-orange-600 mb-2">طلبات معلقة</div>
                        <div className="text-4xl font-black text-neutral-900">{pendingGymsCount}</div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-bold text-neutral-700 mb-2">النوادي النشطة</div>
                        <div className="text-4xl font-black text-neutral-900">{activePercentage}%</div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-neutral-700">
                        <thead className="bg-neutral-50 border-b border-neutral-100 text-neutral-500 font-bold">
                            <tr>
                                <th className="px-6 py-4 rounded-tr-3xl">اسم الجيم</th>
                                <th className="px-6 py-4">اسم المالك</th>
                                <th className="px-6 py-4">الإيميل</th>
                                <th className="px-6 py-4 text-center">تاريخ التسجيل</th>
                                <th className="px-6 py-4 text-center">الحالة</th>
                                <th className="px-6 py-4 text-center">عدد الأعضاء</th>
                                <th className="px-6 py-4 rounded-tl-3xl">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 font-medium">
                            {gyms.length > 0 ? gyms.map((gym) => (
                                <tr key={gym.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center font-bold text-sm shrink-0">
                                                {gym.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="font-bold text-neutral-900">{gym.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{gym.owner?.name || 'غير محدد'}</td>
                                    <td className="px-6 py-4 text-neutral-500">{gym.email || gym.owner?.email || '-'}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-center text-xs">{formatDate(gym.createdAt)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                                                gym.status === 'APPROVED' ? 'bg-green-50 text-green-600' : 
                                                gym.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' : 
                                                'bg-red-50 text-red-600'
                                            }`}>
                                                {gym.status === 'APPROVED' ? 'مقبول' : gym.status === 'PENDING' ? 'قيد الانتظار' : 'مرفوض/موقوف'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-black text-lg text-neutral-900">{gym._count?.members || 0}</td>
                                    <td className="px-6 py-4">
                                        {gym.status === 'PENDING' ? (
                                            <div className="flex items-center gap-2">
                                                <form action={updateGymStatus.bind(null, gym.id, 'APPROVED')}>
                                                    <button type="submit" className="bg-brand-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-700 transition-colors">قبول</button>
                                                </form>
                                                <form action={updateGymStatus.bind(null, gym.id, 'REJECTED')}>
                                                    <button type="submit" className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors">رفض</button>
                                                </form>
                                            </div>
                                        ) : (
                                            <div className="text-xs text-neutral-400">-</div>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-neutral-500">
                                        لا توجد أندية رياضية مسجلة حالياً
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {gyms.length > 0 && (
                <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between text-sm">
                    <span className="text-neutral-500">عرض {gyms.length} جيم</span>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">
                            <ChevronRight size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold">1</button>
                        <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50">
                            <ChevronLeft size={16} />
                        </button>
                    </div>
                </div>
                )}
            </div>

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

