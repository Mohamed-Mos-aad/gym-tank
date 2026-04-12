// ** Assets
import { Dumbbell, Languages, RotateCcwKey, Save, UserRound } from "lucide-react";
// ** Components
import Button from "@/components/ui/Button";
import Input from '@/components/ui/Input';
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Select from "@/components/ui/Select";



export default function Setting() {
    return (
        <main className="flex flex-col gap-6 lg:gap-8">
            <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-[32px] font-black text-neutral-900 sm:text-[40px]">إعدادات النظام</h1>
                    <p className="text-[14px] text-neutral-700">تخصيص معلومات النادي والملف الشخصي والتحكم في تفضيلات الحساب.</p>
                </div>
                <Button variant="primary" className="flex w-full items-center justify-center gap-2 sm:w-fit">
                    <Save className="text-white" size={20} strokeWidth={3} />
                    حفظ التغييرات
                </Button>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col gap-8">
                    <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-8 text-right shadow sm:p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 flex justify-center items-center rounded-lg bg-[#EEF2FF]">
                                <Dumbbell className="text-brand-500"/>
                            </div>
                            <div>
                                <h2 className="text-[20px] font-bold text-neutral-900">معلومات النادي</h2>
                                <p className="text-[12px] text-neutral-700">البيانات العامة التي تظهر للمشتركين وفي التقارير.</p>
                            </div>
                        </div>
                        <form className="flex flex-col gap-4">
                            <Input id="gymName" label="اسم النادي الرياضي" type="text" defaultValue="GymTank Elite"/>
                            <Input id="gymSpeicla" label="التخصص" type="text" defaultValue="كمال أجسام ولياقة بدنية"/>
                            <Input id="gymPhone" label="رقم التواصل الرئيسي" type="text" defaultValue="+966 50 000 0000"/>
                            <Input id="gymEmail" label="البريد الإلكتروني للنادي" type="text" defaultValue="contact@gymtank.com"/>
                            <Input id="gymAddress" label="العنوان" type="text" defaultValue="طريق الملك فهد، الرياض، المملكة العربية السعودية"/>
                        </form>
                    </div>
                    <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-8 text-right shadow sm:p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 flex justify-center items-center rounded-lg bg-[#D8E2FF]">
                                <Languages className="text-[#0058BE]"/>
                            </div>
                            <div>
                                <h2 className="text-[20px] font-bold text-neutral-900">اللغة والمنطقة</h2>
                                <p className="text-[12px] text-neutral-700">تخصيص واجهة العرض والتوقيت المحلي.</p>
                            </div>
                        </div>
                        <form className="grid grid-cols-2 gap-6">
                            <Select id="systemLanguage" label="لغة النظام الافتراضية" options={[{label: 'text1', value: 'text1'},{label: 'text2', value: 'text2'}]}/>
                            <Select id="systemTime" label="المنطقة الزمنية" options={[{label: 'text1', value: 'text1'},{label: 'text2', value: 'text2'}]}/>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-8 text-right shadow sm:p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 flex justify-center items-center rounded-lg bg-[#FFDBCC]">
                                <UserRound className="text-[#7E3000]"/>
                            </div>
                            <div>
                                <h2 className="text-[20px] font-bold text-neutral-900">الملف الشخصي للمالك</h2>
                                <p className="text-[12px] text-neutral-700">بيانات حسابك الشخصي ووسيلة تسجيل الدخول.</p>
                            </div>
                        </div>
                        <form className="flex flex-col gap-4">
                            <Input id="gymOwnerName" label="اسم المالك الكامل" type="text" defaultValue="أحمد محمد القحطاني"/>
                            <Input id="gymOwnerEmail" label="البريد الإلكتروني للحساب" type="text" defaultValue="ahmed.q@gymtank.com"/>
                            <Input id="gymOwnerPassword" label="كلمة المرور الحالية" type="password" defaultValue="151511551"/>
                        </form>
                        <Link href={"#"} className="flex items-center gap-2 text-[14px] font-bold text-brand-500">
                            <RotateCcwKey width={20}/>
                            تغيير كلمة المرور
                        </Link>
                    </div>
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
                    <div className="relative flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-[#C7C4D8]/20 p-8 text-right shadow sm:p-8">
                        <h2 className="text-[16px] text-neutral-700">هل تحتاج إلى مساعدة في الإعدادات؟</h2>
                        <Button variant="guest" className="bg-[#E6E8EA] text-[#191C1E]">تحدث مع الدعم الفني</Button>
                    </div>
                </div>
            </section>
        </main>
    )
}
