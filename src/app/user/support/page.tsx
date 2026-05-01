import { HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";
import UserSupportClient from "@/components/user/UserSupportClient";
import { getUserAction } from "@/actions/user/user.actions";
import { cookies } from "next/headers";

export default async function UserSupportPage() {
    const userId = (await cookies()).get("gym_tank_token")?.value;
    const user = userId ? await getUserAction(userId) : null;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-neutral-900">الدعم الفني</h1>
                <p className="text-sm text-neutral-700">نحن هنا لمساعدتك في أي استفسار أو مشكلة تواجهك في المنصة.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Cards */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                            <Mail size={24} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-neutral-400 uppercase">البريد الإلكتروني</div>
                            <div className="text-sm font-bold text-neutral-900">support@gymtank.com</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-neutral-400 uppercase">واتساب الدعم</div>
                            <div className="text-sm font-bold text-neutral-900">+20 101 234 5678</div>
                        </div>
                    </div>

                    <div className="bg-brand-500 rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-lg font-black mb-2">هل تواجه مشكلة عاجلة؟</h3>
                            <p className="text-sm text-brand-100 mb-6">فريقنا متاح للرد على المكالمات الطارئة خلال ساعات العمل الرسمية.</p>
                            <a href="tel:+201012345678" className="flex items-center gap-2 bg-white text-brand-500 px-6 py-3 rounded-xl font-black w-fit hover:bg-brand-50 transition-colors">
                                <Phone size={18} />
                                اتصل بنا الآن
                            </a>
                        </div>
                        <HelpCircle size={120} className="absolute -bottom-10 -left-10 text-brand-400/20" />
                    </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-2">
                    <UserSupportClient defaultUser={user} />
                </div>
            </div>
        </div>
    );
}
