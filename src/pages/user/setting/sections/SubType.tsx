// ** Components
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";



export default function SubType() {
    return (
        <div className="relative flex flex-col gap-4 rounded-3xl bg-[#4F46E5] p-8 text-right shadow sm:p-8">
            <h2 className="text-[12px] font-black text-[#C7D2FE]">SUBSCRIPTION STATUS</h2>
            <h3 className="w-full flex justify-between items-center text-[24px] font-bold text-white">
                باقة المحترفين (Pro)
                <Badge className="bg-white/20 text-[10px] text-white">نشط</Badge>
            </h3>
            <p className="text-[14px] text-[#E0E7FF]">
                ينتهي اشتراكك الحالي في 12 نوفمبر 2024. سيتم التجديد
                تلقائياً.
            </p>
            <div className="flex flex-col gap-4 bg-white/10 rounded-2xl p-4">
                <div className="flex flex-col gap-2">
                    <h4 className="w-full flex justify-between text-[12px] font-bold text-white">
                        STORAGE
                        <span>
                            75%
                        </span>
                    </h4>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden relative">
                        <span className="w-[42%] h-2 bg-white absolute top-0 right-0"></span>
                    </div>
                </div>
                <Button variant="guest" className="w-full">ترقية</Button>
            </div>
        </div>
    )
}