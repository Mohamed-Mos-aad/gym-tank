// ** Components
import Button from "@/components/ui/Button";
// ** Assets
import { CircleCheck } from "lucide-react";



export default function Prices() {
    return (
        <section id="pricing" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 text-center">
                <h1 className="text-3xl font-black text-neutral-900 sm:text-4xl lg:text-5xl">خطط تناسب طموحك</h1>
                <p className="text-[16px] text-neutral-700">ابدأ صغيراً واكبر معنا، لا توجد تكاليف خفية.</p>
                <div className="mt-10 grid w-full max-w-5xl gap-6 lg:grid-cols-2">
                    <div className="flex w-full flex-col gap-4 rounded-4xl bg-white p-8 text-right shadow-lg sm:p-10">
                        <h2 className="text-[20px] font-bold text-neutral-700">الخطة الأساسية</h2>
                        <h3 className="mb-2 text-[16px] text-neutral-700">
                            <span className="text-[36px] font-black text-neutral-900">199 </span>
                            ريال / شهر
                        </h3>
                        <ul className="mb-6 flex flex-col gap-4 text-[16px] text-neutral-900">
                            <li className="flex items-center gap-3">
                                <CircleCheck size={17} className="text-brand-500"/>
                                إدارة حتى 100 مشترك
                            </li>
                            <li className="flex items-center gap-3">
                                <CircleCheck size={17} className="text-brand-500"/>
                                نظام الحضور والانصراف
                            </li>
                            <li className="flex items-center gap-3">
                                <CircleCheck size={17} className="text-brand-500"/>
                                تقارير مالية أساسية
                            </li>
                        </ul>
                        <Button variant="guest" className="w-full py-4">اشترك الآن</Button>
                    </div>
                    <div className="relative flex w-full flex-col gap-4 rounded-4xl bg-brand-500 p-8 text-right shadow-lg sm:p-10">
                        <span className="absolute top-6 right-6 w-fit rounded-full bg-white/20 px-4 py-1 text-[12px] font-bold text-white">
                            الأكثر طلباً
                        </span>
                        <h2 className="pt-8 text-[20px] font-bold text-white sm:pt-4">الخطة الأحترافية</h2>
                        <h3 className="mb-2 text-[16px] text-white">
                            <span className="text-[36px] font-black text-white">449 </span>
                            ريال / شهر
                        </h3>
                        <ul className="mb-6 flex flex-col gap-4 text-[16px] text-white">
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
                        <Button variant="guest" className="w-full py-4">اشترك الآن</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
