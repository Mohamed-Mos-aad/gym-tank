// ** Components
import Badge from "@/components/ui/Badge";
// ** Assets
import AddMemberModal from "../../members/components/AddMemberModal";

interface WelcomeProps {
    ownerName?: string;
    gymName?: string;
    expiringSoon?: number;
    memberSubscriptionTypes?: string[];
}

export default function Welcome({ ownerName, gymName, expiringSoon, memberSubscriptionTypes }: WelcomeProps) {
    return (
        <section className="relative overflow-hidden flex flex-col gap-6 rounded-[32px] bg-[#0f172a] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:p-12 shadow-xl shadow-brand-900/10 border border-white/5">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

            <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <Badge className="bg-white/20 text-[10px] font-bold text-white">نظرة عامة</Badge>
                    {gymName && <span className="text-white/60 text-xs font-bold border-r border-white/20 pr-3">{gymName}</span>}
                </div>
                
                <h1 className="text-[36px] font-black text-white">مرحبًا</h1>
                <p className="text-[16px] text-brand-50 max-w-xl">
                    {expiringSoon && expiringSoon > 0 
                        ? `لديك ${expiringSoon} عضو تنتهي اشتراكاتهم قريباً. ننصحك بالتواصل معهم لتجديد العضوية.` 
                        : "نتمنى لك يوماً سعيداً ومليئاً بالنشاط في ناديك الرياضي اليوم."}
                </p>
            </div>
            
            <div className="relative z-10">
                <AddMemberModal memberSubscriptionTypes={memberSubscriptionTypes} />
            </div>
        </section>
    )
}