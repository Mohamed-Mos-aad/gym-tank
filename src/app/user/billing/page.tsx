import { getPlans } from "@/actions/admin/plans.actions";
import { getGymAction } from "@/actions/user/gym.actions";
import { getGlobalSettings } from "@/actions/admin/settings.actions";
import UserBillingClient from "@/components/user/UserBillingClient";
import { CreditCard, ShieldCheck, Zap } from "lucide-react";

export default async function UserBillingPage() {
    const plans = await getPlans();
    const gym = await getGymAction();
    const settings = await getGlobalSettings();

    // Find current active subscription
    const activeSub = gym.subscriptions?.find(s => s.status === "ACTIVE");
    const pendingRequests = gym.paymentRequests?.filter(r => r.status === "PENDING") || [];

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-neutral-900">اشتراك المنصة</h1>
                <p className="text-sm text-neutral-700">اختر الباقة المناسبة لجيم {gym.name} وتابع حالة مدفوعاتك.</p>
            </div>

            {/* Current Status Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${activeSub ? 'bg-brand-50 text-brand-500' : 'bg-orange-50 text-orange-500'}`}>
                        {activeSub ? <ShieldCheck size={32} /> : <Zap size={32} />}
                    </div>
                    <div>
                        <div className="text-xs font-bold text-neutral-500 mb-1 uppercase tracking-wider">الحالة الحالية</div>
                        <div className="text-2xl font-black text-neutral-900">
                            {activeSub ? `باقة ${activeSub.planName}` : 'لا يوجد اشتراك نشط'}
                        </div>
                        {activeSub?.endDate && (
                            <p className="text-sm text-neutral-500 mt-1">
                                ينتهي في {new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date(activeSub.endDate))}
                            </p>
                        )}
                    </div>
                </div>
                
                {pendingRequests.length > 0 && (
                    <div className="bg-orange-50 text-orange-700 px-6 py-3 rounded-2xl border border-orange-100 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                        <span className="text-sm font-bold">يوجد {pendingRequests.length} طلب دفع قيد المراجعة</span>
                    </div>
                )}
            </div>

            <UserBillingClient 
                plans={plans} 
                gymId={gym.id} 
                currency={settings?.currency || "EGP"} 
                pendingRequests={pendingRequests}
            />
        </div>
    );
}
