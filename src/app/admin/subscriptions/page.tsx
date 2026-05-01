import { Wallet, TrendingUp, Users, Clock, Percent, MessageSquare } from "lucide-react";
import Link from "next/link";
import { getPlans, getSubscriptionStats } from "@/actions/admin/plans.actions";
import { getGlobalSettings } from "@/actions/admin/settings.actions";
import AdminPlansClient from "@/components/admin/AdminPlansClient";

export default async function AdminSubscriptionsPage() {
    const plans = await getPlans();
    const stats = await getSubscriptionStats();
    const settings = await getGlobalSettings();
    const currency = settings?.currency || "SAR";

    return (
        <div className="flex flex-col gap-8">
            {/* Plans Section handled by Client Component */}
            <AdminPlansClient 
                initialPlans={plans.map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    description: p.description,
                    features: p.features,
                    isPopular: p.isPopular
                }))} 
                currency={currency}
            />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-bold text-neutral-500 mb-2">الإيرادات المتوقعة</div>
                        <div className="text-2xl font-black text-neutral-900">{currency} {stats.estimatedRevenue.toLocaleString()}</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                        <Wallet size={24} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-bold text-neutral-500 mb-2">نمو الاشتراكات (شهري)</div>
                        <div className="text-2xl font-black text-neutral-900">+{stats.growth}%</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-bold text-neutral-500 mb-2">إجمالي المشتركين النشطين</div>
                        <div className="text-2xl font-black text-neutral-900">{stats.totalSubscribers}</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center">
                        <Users size={24} />
                    </div>
                </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                <div className="flex justify-between items-center mb-8 border-b border-neutral-100 pb-4">
                    <div>
                        <h2 className="text-xl font-black text-neutral-900">إعدادات الاشتراك المتقدمة</h2>
                        <p className="text-sm text-neutral-500 mt-1">تحكم في فترات السماح، الضرائب، وسياسات الاسترجاع.</p>
                    </div>
                    <Link href="/admin/settings" className="text-sm font-bold text-brand-500 hover:underline">تعديل كافة الإعدادات</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <Clock className="text-neutral-400 mt-1" size={20} />
                            <div>
                                <h3 className="font-bold text-neutral-900">فترة السماح بعد انتهاء الاشتراك</h3>
                                <p className="text-xs text-neutral-500 mt-1">الأيام التي يمكن للعضو فيها الدخول بعد الانتهاء</p>
                            </div>
                        </div>
                        <div className="bg-neutral-100 px-4 py-2 rounded-lg font-bold text-neutral-900 text-sm">{settings?.gracePeriodDays || 3} أيام</div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <Percent className="text-neutral-400 mt-1" size={20} />
                            <div>
                                <h3 className="font-bold text-neutral-900">ضريبة القيمة المضافة</h3>
                                <p className="text-xs text-neutral-500 mt-1">تطبق على جميع الباقات عند الدفع</p>
                            </div>
                        </div>
                        <div className="bg-neutral-100 px-4 py-2 rounded-lg font-bold text-neutral-900 text-sm">{settings?.vatRate || 15}%</div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <MessageSquare className="text-neutral-400 mt-1" size={20} />
                            <div>
                                <h3 className="font-bold text-neutral-900">إشعارات التذكير</h3>
                                <p className="text-xs text-neutral-500 mt-1">إرسال تنبيه قبل 3 أيام من الانتهاء</p>
                            </div>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors bg-brand-500`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform -translate-x-6`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
