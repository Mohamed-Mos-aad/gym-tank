// ** Assets
import { Banknote, ChartNoAxesCombined, UsersRound } from "lucide-react";




export default function Features() {
    return (
        <section className="flex flex-col items-center gap-4 bg-[#F2F4F6] px-12 py-26">
            <h1 className="text-[48px] font-black text-[#191C1E]">كل ما تحتاجه للنجاح</h1>
            <p className="text-[16px] text-[#464555]">صممنا GymTank ليكون الرفيق المثالي لرحلة إدارة جيمك، مع التركيز على الكفاءة والسهولة.</p>
            <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="flex flex-col gap-3 bg-white rounded-3xl p-8">
                    <div className="w-16 h-16 flex justify-center items-center bg-[#3525CD]/10 rounded-2xl"><UsersRound strokeWidth={3} className="text-primary"/></div>
                    <h2 className="text-[24px] font-bold text-[#191C1E]">إدارة الأعضاء</h2>
                    <p className="text-[16px] text-[#464555]">
                        سجل بيانات المشتركين، صورهم، وتاريخهم
                        الطبي والرياضي في ملفات رقمية منظمة وسهلة
                        الوصول.
                    </p>
                </div>
                <div className="flex flex-col gap-3 bg-white rounded-3xl p-8">
                    <div className="w-16 h-16 flex justify-center items-center bg-[#0058BE]/10 rounded-2xl"><Banknote strokeWidth={3} className="text-[#0058BE]"/></div>
                    <h2 className="text-[24px] font-bold text-[#191C1E]">إدارة الأعضاء</h2>
                    <p className="text-[16px] text-[#464555]">
                        سجل بيانات المشتركين، صورهم، وتاريخهم
                        الطبي والرياضي في ملفات رقمية منظمة وسهلة
                        الوصول.
                    </p>
                </div>
                <div className="flex flex-col gap-3 bg-white rounded-3xl p-8">
                    <div className="w-16 h-16 flex justify-center items-center bg-[#7E3000]/10 rounded-2xl"><ChartNoAxesCombined strokeWidth={3} className="text-[#7E3000]"/></div>
                    <h2 className="text-[24px] font-bold text-[#191C1E]">إدارة الأعضاء</h2>
                    <p className="text-[16px] text-[#464555]">
                        سجل بيانات المشتركين، صورهم، وتاريخهم
                        الطبي والرياضي في ملفات رقمية منظمة وسهلة
                        الوصول.
                    </p>
                </div>
            </div>
        </section>
    )
}