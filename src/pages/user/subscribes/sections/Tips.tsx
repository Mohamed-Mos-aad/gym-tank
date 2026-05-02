import Button from "@/components/ui/Button";
import { Sparkles, BarChart3 } from "lucide-react";

interface TipsProps {
    data: any[];
}

export default function Tips({ data }: TipsProps) {
    // Calculate Dynamic Package Distribution
    const calculateDistribution = () => {
        if (!data || data.length === 0) return [];
        
        const counts: Record<string, number> = {};
        data.forEach(member => {
            const type = member.subscriptionType || "أساسية";
            counts[type] = (counts[type] || 0) + 1;
        });

        const total = data.length;
        const colors = ["bg-brand-500", "bg-emerald-500", "bg-orange-500", "bg-neutral-800"];
        
        return Object.entries(counts).map(([label, count], idx) => ({
            label,
            percent: Math.round((count / total) * 100),
            color: colors[idx % colors.length]
        })).sort((a, b) => b.percent - a.percent);
    };

    const distribution = calculateDistribution();

    return (
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
            <div className="relative overflow-hidden flex flex-col items-start gap-6 rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-800 p-8 lg:col-span-2 shadow-xl shadow-brand-500/20 group">
                <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-brand-100 font-bold text-sm">
                        <Sparkles size={18} className="text-brand-300" />
                        <span>نصيحة ذكية للمالك</span>
                    </div>
                    <h2 className="text-[28px] font-black text-white leading-tight">
                        كيف تزيد مبيعاتك بنسبة ٢٥٪؟
                    </h2>
                    <p className="text-base text-brand-50 max-w-lg leading-relaxed font-bold">
                        الأعضاء الذين يتلقون تذكيراً قبل انتهاء اشتراكهم بـ ٣ أيام هم الأكثر عرضة للتجديد فوراً. جرب تفعيل التنبيهات الآن!
                    </p>
                    <button 
                        className="inline-flex items-center gap-2 bg-white text-brand-600 border-2 border-white hover:bg-brand-50 font-black text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-black/10 mt-2"
                    >
                        تفعيل التنبيهات
                    </button>
                </div>
                
                <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-20 group-hover:scale-110 transition-transform duration-700 text-white">
                    <Sparkles size={300} strokeWidth={1} />
                </div>
            </div>

            <div className="flex flex-col gap-8 rounded-[2rem] bg-white p-8 border border-neutral-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400">
                        <BarChart3 size={20} />
                    </div>
                    <h2 className="text-lg font-black text-neutral-900">
                        توزيع الباقات الفعلي
                    </h2>
                </div>

                <ul className="flex flex-col gap-6">
                    {distribution.length > 0 ? distribution.map((item, idx) => (
                        <li key={idx}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-neutral-600">{item.label}</span>
                                <span className="text-sm font-black text-neutral-900">{item.percent}%</span>
                            </div>
                            <div className="w-full h-2 bg-neutral-50 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                                    style={{ width: `${item.percent}%` }}
                                ></div>
                            </div>
                        </li>
                    )) : (
                        <p className="text-center text-neutral-400 font-bold py-10 text-xs">لا توجد بيانات كافية للتحليل</p>
                    )}
                </ul>
            </div>
        </section>
    );
}
