import Button from "@/components/ui/Button";



export default function Tips() {
    return (
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col items-start gap-6 rounded-2xl bg-linear-to-br from-brand-500 from-25% to-brand-700 p-6 sm:p-8 lg:col-span-2">
                <h2 className="text-[24px] font-bold text-white">
                    تحسين تجربة الأعضاء
                </h2>
                <p className="text-[14px] text-[#E0E7FF]">
                    هل لاحظت تراجعاً في التجديدات؟ استخدم نظام التذكير التلقائي لزيادة
                    معدل الاستبقاء بنسبة تصل إلى 25%.
                </p>
                <Button variant="guest">تفعيل التنبيهات</Button>
            </div>
            <div className="flex flex-col gap-6 rounded-3xl bg-[#E6E8EA]/50 p-6 text-right shadow sm:p-8">
                <h2 className="text-[18px] font-bold text-[#191C1E]">
                    توزيع الباقات
                </h2>
                <ul className="flex flex-col gap-4">
                    <li>
                    <h3 className="w-full flex justify-between items-center text-[12px] font-bold text-[#191C1E]">
                        البلاتينية
                        <span>42%</span>
                    </h3>
                    <div className="w-full h-2 bg-[#E0E3E5] rounded-full overflow-hidden relative">
                        <span className="w-[42%] h-2 bg-[#3525CD] absolute top-0 right-0"></span>
                    </div>
                    </li>
                    <li>
                    <h3 className="w-full flex justify-between items-center text-[12px] font-bold text-[#191C1E]">
                        البريميوم
                        <span>35%</span>
                    </h3>
                    <div className="w-full h-2 bg-[#E0E3E5] rounded-full overflow-hidden relative">
                        <span className="w-[35%] h-2 bg-[#0058BE] absolute top-0 right-0"></span>
                    </div>
                    </li>
                    <li>
                    <h3 className="w-full flex justify-between items-center text-[12px] font-bold text-[#191C1E]">
                        الأساسية
                        <span>23%</span>
                    </h3>
                    <div className="w-full h-2 bg-[#E0E3E5] rounded-full overflow-hidden relative">
                        <span className="w-[23%] h-2 bg-neutral-700 absolute top-0 right-0"></span>
                    </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}
