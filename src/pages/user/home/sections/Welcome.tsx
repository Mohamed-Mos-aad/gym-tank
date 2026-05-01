// ** Components
import Badge from "@/components/ui/Badge";
// ** Assets
import AddMemberModal from "../components/AddMemberModal";

interface WelcomeProps {
    ownerName?: string;
    gymName?: string;
    expiringSoon?: number;
}

export default function Welcome({ ownerName, gymName, expiringSoon }: WelcomeProps) {
    return (
        <section className="flex flex-col gap-6 rounded-2xl bg-linear-to-br from-brand-500 from-25% to-brand-700 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:p-12">
            <div className="flex flex-col gap-2">
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
                <AddMemberModal />
            </div>
        </section>
    )
}