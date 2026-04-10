// ** Components
import Button from "@/components/ui/Button";
// ** Assets
import { CircleCheck } from "lucide-react";



export default function Prices() {
    return (
        <section className="flex flex-col items-center gap-4 px-12 py-26">
            <h1 className="text-[48px] font-black text-[#191C1E]">خطط تناسب طموحك</h1>
            <p className="text-[16px] text-[#464555]">ابدأ صغيراً واكبر معنا، لا توجد تكاليف خفية.</p>
            <div className="w-[75%] grid grid-cols-2 justify-center gap-8 mt-14">
                <div className="w-full flex flex-col gap-4 shadow-lg rounded-4xl p-10">
                    <h2 className="text-[20px] font-bold text-[#464555]">الخطة الأساسية</h2>
                    <h3 className="text-[16px] text-[#464555] mb-2">
                        <span className="text-[36px] font-black text-[#191C1E]">199 </span>
                        ريال / شهر
                    </h3>
                    <ul className="flex flex-col gap-4 text-[16px] text-[#191C1E] mb-6">
                        <li className="flex items-center gap-3">
                            <CircleCheck size={17} className="text-primary"/>
                            إدارة حتى 100 مشترك
                        </li>
                        <li className="flex items-center gap-3">
                            <CircleCheck size={17} className="text-primary"/>
                            نظام الحضور والانصراف
                        </li>
                        <li className="flex items-center gap-3">
                            <CircleCheck size={17} className="text-primary"/>
                            تقارير مالية أساسية
                        </li>
                    </ul>
                    <Button variant="guest" className="py-4">اشترك الآن</Button>
                </div>
                <div className="w-full flex flex-col gap-4 bg-primary shadow-lg rounded-4xl p-10 relative">
                    <span className="w-fit flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-[12px] font-bold text-white absolute top-10 left-10">
                        الأكثر طلباً
                    </span> 
                    <h2 className="text-[20px] font-bold text-white">الخطة الأحترافية</h2>
                    <h3 className="text-[16px] text-white mb-2">
                        <span className="text-[36px] font-black text-white">449 </span>
                        ريال / شهر
                    </h3>
                    <ul className="flex flex-col gap-4 text-[16px] text-white mb-6">
                        <li className="flex items-center gap-3">
                            <CircleCheck size={17} className="text-white"/>
                            إدارة حتى 100 مشترك
                        </li>
                        <li className="flex items-center gap-3">
                            <CircleCheck size={17} className="text-white"/>
                            نظام الحضور والانصراف
                        </li>
                        <li className="flex items-center gap-3">
                            <CircleCheck size={17} className="text-white"/>
                            تقارير مالية أساسية
                        </li>
                    </ul>
                    <Button variant="guest" className="py-4">اشترك الآن</Button>
                </div>
            </div>
        </section>
    )
}