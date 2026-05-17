import { HelpCircle, Mail, MessageSquare, Phone, Lock } from "lucide-react";
import UserSupportClient from "@/components/user/UserSupportClient";
import { getUserAction } from "@/actions/user/user.actions";
import { getGymAction } from "@/actions/user/gym.actions";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function UserSupportPage() {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    const user = userId ? await getUserAction(userId) : null;
    
    let activePlanName = "التجربة المجانية";
    try {
        const gym = await getGymAction();
        const activeSub = gym.subscriptions?.find((s: any) => s.status === "ACTIVE");
        if (activeSub) {
            activePlanName = activeSub.planName;
        }
    } catch (e) {
        console.error("Error fetching gym/subscription on support page", e);
    }

    const hasWhatsApp = activePlanName === "الباقة الأساسية" || activePlanName === "الباقة المفتوحة";
    const hasPhone = activePlanName === "الباقة المفتوحة";

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-neutral-900">الدعم الفني</h1>
                <p className="text-sm text-neutral-700">نحن هنا لمساعدتك في أي استفسار أو مشكلة تواجهك في المنصة.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Cards */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    {/* Email Card (Free / All) */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                            <Mail size={24} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-neutral-400 uppercase">البريد الإلكتروني</div>
                            <div className="text-sm font-bold text-neutral-900 font-sans">support@gymtank.com</div>
                        </div>
                    </div>

                    {/* WhatsApp Card (Basic / Premium Only) */}
                    {!hasWhatsApp ? (
                        <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-200/60 flex items-center justify-between gap-4 opacity-80 relative">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-neutral-200 text-neutral-400 flex items-center justify-center shrink-0">
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-neutral-400 uppercase">واتساب الدعم</div>
                                    <div className="text-sm font-bold text-neutral-400 flex items-center gap-1">
                                        متاح للباقة الأساسية <Lock size={12} />
                                    </div>
                                </div>
                            </div>
                            <Link href="/user/billing" className="text-[10px] font-black text-brand-500 hover:bg-neutral-100 bg-white border border-neutral-200 px-3 py-1.5 rounded-xl shadow-sm transition-colors shrink-0">
                                ترقية الباقة
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-neutral-400 uppercase">واتساب الدعم</div>
                                <div className="text-sm font-bold text-neutral-900 font-sans">+20 101 234 5678</div>
                            </div>
                        </div>
                    )}

                    {/* Phone Call Card (Premium / Open Only) */}
                    {!hasPhone ? (
                        <div className="bg-neutral-100 rounded-3xl p-8 border border-neutral-200 text-neutral-600 relative overflow-hidden opacity-80 flex flex-col justify-between">
                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-1 bg-neutral-200 text-neutral-600 text-[10px] font-black px-2.5 py-1 rounded-full mb-3">
                                    <Lock size={10} /> خاص بالباقة المفتوحة
                                </span>
                                <h3 className="text-base font-black mb-2 text-neutral-800">الدعم الهاتفي 24/7</h3>
                                <p className="text-xs text-neutral-500 mb-6 leading-relaxed">المكالمات الطارئة والدعم الهاتفي متاح على مدار الساعة حصرياً لمشتركي الباقة المفتوحة.</p>
                                <Link href="/user/billing" className="inline-flex items-center justify-center gap-2 bg-neutral-200 text-neutral-700 hover:bg-neutral-300 px-5 py-3 rounded-xl font-black transition-colors text-xs shrink-0">
                                    ترقية الباقة المفتوحة
                                </Link>
                            </div>
                            <HelpCircle size={120} className="absolute -bottom-10 -left-10 text-neutral-300/10 pointer-events-none" />
                        </div>
                    ) : (
                        <div className="bg-brand-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-brand-500/20">
                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-black px-2.5 py-1 rounded-full mb-3">
                                    ⚡ باقة مفتوحة نشطة
                                </span>
                                <h3 className="text-lg font-black mb-2">هل تواجه مشكلة عاجلة؟</h3>
                                <p className="text-sm text-brand-100 mb-6">فريقنا متاح للرد على المكالمات الطارئة على مدار 24 ساعة.</p>
                                <a href="tel:+201012345678" className="flex items-center gap-2 bg-white text-brand-500 px-6 py-3 rounded-xl font-black w-fit hover:bg-brand-50 transition-colors">
                                    <Phone size={18} />
                                    اتصل بنا الآن
                                </a>
                            </div>
                            <HelpCircle size={120} className="absolute -bottom-10 -left-10 text-brand-400/20 pointer-events-none" />
                        </div>
                    )}
                </div>

                {/* Form */}
                <div className="lg:col-span-2">
                    <UserSupportClient defaultUser={user} />
                </div>
            </div>
        </div>
    );
}
