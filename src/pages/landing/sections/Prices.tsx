import { getPlans } from "@/actions/admin/plans.actions";
import { getGlobalSettings } from "@/actions/admin/settings.actions";
// ** Components
import Button from "@/components/ui/Button";
// ** Assets
import { CircleCheck, Zap } from "lucide-react";
import Link from "next/link";

export default async function Prices() {
    const plans = await getPlans();
    const settings = await getGlobalSettings();
    const currency = settings?.currency || "SAR";

    return (
        <section id="pricing" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 text-center">
                <h1 className="text-3xl font-black text-neutral-900 sm:text-4xl lg:text-5xl">خطط تناسب طموحك</h1>
                <p className="text-[16px] text-neutral-700">ابدأ صغيراً واكبر معنا، لا توجد تكاليف خفية.</p>
                <div className="mt-10 grid w-full max-w-5xl gap-6 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`relative flex w-full flex-col gap-4 rounded-4xl p-8 text-right shadow-lg sm:p-10 transition-all ${plan.isPopular ? 'bg-brand-500 text-white scale-105 z-10' : 'bg-white text-neutral-900'}`}>
                            {plan.isPopular && (
                                <span className="absolute top-6 left-6 w-fit rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white flex items-center gap-1">
                                    <Zap size={12} /> الأكثر طلباً
                                </span>
                            )}
                            <h2 className={`pt-2 text-[20px] font-bold ${plan.isPopular ? 'text-white' : 'text-neutral-700'}`}>{plan.name}</h2>
                            <h3 className={`mb-2 text-[16px] ${plan.isPopular ? 'text-white' : 'text-neutral-700'}`}>
                                <span className={`text-[36px] font-black ${plan.isPopular ? 'text-white' : 'text-neutral-900'}`}>{plan.price} </span>
                                {currency} / شهر
                            </h3>
                            <ul className={`mb-6 flex flex-col gap-4 text-[15px] flex-1 ${plan.isPopular ? 'text-white' : 'text-neutral-700'}`}>
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CircleCheck size={18} className={`mt-0.5 shrink-0 ${plan.isPopular ? 'text-white' : 'text-brand-500'}`}/>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/sign-up" className="w-full">
                                <Button variant={plan.isPopular ? "guest" : "primary"} className="w-full py-4">اشترك الآن</Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
