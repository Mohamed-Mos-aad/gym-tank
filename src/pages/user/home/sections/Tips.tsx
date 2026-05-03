"use client";

// ** Hooks && Tools
import { useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Lightbulb, CheckCircle2, Sparkles } from "lucide-react";

const tipsList = [
    {
        title: "زيادة التفاعل",
        text: "قم بإرسال تذكيرات تلقائية للأعضاء الذين لم يحضروا منذ أكثر من 7 أيام لزيادة معدل الاحتفاظ.",
        actionText: "تفعيل التذكير الذكي"
    },
    {
        title: "العروض الخاصة",
        text: "الأعضاء الذين يقترب اشتراكهم من الانتهاء يحبون العروض الحصرية. جرب تقديم خصم 10% للتجديد المبكر.",
        actionText: "إنشاء عرض خصم"
    },
    {
        title: "ساعات الذروة",
        text: "استخدم بيانات 'المتواجدون الآن' لتنظيم حصص تدريبية في أوقات الهدوء لتقليل الزحام.",
        actionText: "عرض التحليلات"
    }
];

export default function Tips() {
    const [tip, setTip] = useState(tipsList[0]);
    const [isActivated, setIsActivated] = useState(false);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * tipsList.length);
        setTip(tipsList[randomIndex]);
    }, []);

    const handleAction = () => {
        setIsActivated(true);
        setTimeout(() => setIsActivated(false), 3000);
    };

    return (
        <div className="relative flex flex-col justify-between gap-6 rounded-[32px] bg-brand-700 p-8 shadow-xl shadow-brand-500/20 h-fit overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Sparkles size={120} className="text-white" />
            </div>
            
            <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center text-brand-900 shadow-lg shadow-amber-400/20">
                        <Lightbulb size={24} fill="currentColor" />
                    </div>
                    <div className="flex flex-col">
                        <Badge className="bg-white/10 text-[10px] font-bold text-white border border-white/10 w-fit mb-1">نصيحة ذكية</Badge>
                        <span className="text-[10px] text-brand-200 font-bold uppercase tracking-wider">نظام تانك</span>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-2xl font-black text-white mb-3 tracking-tight">{tip.title}</h2>
                    <p className="text-[15px] font-bold text-brand-50/90 leading-relaxed italic">
                        "{tip.text}"
                    </p>
                </div>
            </div>

            <div className="relative z-10 pt-4">
                <Button 
                    variant={isActivated ? "primary" : "guest"} 
                    className={`w-full py-4 rounded-2xl font-black transition-all duration-300 shadow-lg ${isActivated ? "bg-emerald-500 border-emerald-500 scale-[0.98]" : "hover:bg-white hover:text-brand-700"}`}
                    onClick={handleAction}
                    disabled={isActivated}
                >
                    {isActivated ? (
                        <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 size={18} />
                            تم التفعيل بنجاح
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            {tip.actionText}
                        </div>
                    )}
                </Button>
            </div>
        </div>
    )
}
