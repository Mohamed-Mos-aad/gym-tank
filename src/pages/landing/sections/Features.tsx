// ** Assets
import { Banknote, ChartNoAxesCombined, UsersRound } from "lucide-react";




export default function Features() {
    return (
        <section id="features" className="scroll-mt-24 bg-neutral-100 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 text-center">
                <h1 className="text-3xl font-black text-neutral-900 sm:text-4xl lg:text-5xl">كل ما تحتاجه للنجاح</h1>
                <p className="max-w-3xl text-[16px] text-neutral-700">
                    صممنا GymTank ليكون الرفيق المثالي لرحلة إدارة جيمك، مع التركيز على الكفاءة والسهولة.
                </p>
                <div className="mt-10 grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="flex flex-col gap-3 rounded-3xl bg-white p-8 text-right">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10">
                            <UsersRound strokeWidth={3} className="text-brand-500"/>
                        </div>
                        <h2 className="text-[24px] font-bold text-neutral-900">إدارة الأعضاء</h2>
                        <p className="text-[16px] text-neutral-700">
                            سجل بيانات المشتركين، صورهم، وتاريخهم
                            الطبي والرياضي في ملفات رقمية منظمة وسهلة
                            الوصول.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 rounded-3xl bg-white p-8 text-right">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-info-600/10">
                            <Banknote strokeWidth={3} className="text-info-600"/>
                        </div>
                        <h2 className="text-[24px] font-bold text-neutral-900">إدارة الأعضاء</h2>
                        <p className="text-[16px] text-neutral-700">
                            سجل بيانات المشتركين، صورهم، وتاريخهم
                            الطبي والرياضي في ملفات رقمية منظمة وسهلة
                            الوصول.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 rounded-3xl bg-white p-8 text-right sm:col-span-2 xl:col-span-1">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warn-700/10">
                            <ChartNoAxesCombined strokeWidth={3} className="text-warn-700"/>
                        </div>
                        <h2 className="text-[24px] font-bold text-neutral-900">إدارة الأعضاء</h2>
                        <p className="text-[16px] text-neutral-700">
                            سجل بيانات المشتركين، صورهم، وتاريخهم
                            الطبي والرياضي في ملفات رقمية منظمة وسهلة
                            الوصول.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
