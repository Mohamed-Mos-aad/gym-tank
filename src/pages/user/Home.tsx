// ** Components
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CircleAlert, CircleCheck, EllipsisVertical, Plus, UsersRound } from "lucide-react";
import Link from "next/link";



export default function Home() {
    return (
        <main className="flex flex-col gap-8">
            <section className="flex justify-between items-center bg-linear-to-br from-brand-500 from-25% to-[#4F46E5] rounded-2xl p-6 sm:p-8 lg:min-h-0 lg:gap-4 lg:p-12">
                <div className="flex flex-col gap-2">
                    <Badge className="bg-white/20 text-[10px] font-bold text-white">نظرة عامة</Badge>
                    <h1 className="text-[36px] font-black text-white">مرحبا</h1>
                    <p className="text-[16px] text-[#E0E7FF]">لديك 12 عضواً جديداً انضموا هذا الأسبوع. واصل التقدم الرائع!</p>
                </div>
                <Button variant="guest" className="flex items-center gap-2">
                    <Plus className="text-brand-500" size={20} strokeWidth={3}/>
                    إضافة عضو جديد
                </Button>
            </section>
            <section className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <div className="flex flex-col gap-4 rounded-3xl bg-white shadow p-8 text-right relative">
                    <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669] absolute top-8 left-8">12% +</Badge>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10">
                        <UsersRound className="text-brand-500"/>
                    </div>
                    <h2 className="text-[14px] font-medium text-neutral-900">إجمالي الأعضاء</h2>
                    <p className="text-[36px] font-black text-[#1E1B4B] -mt-6">
                        1,284
                    </p>
                </div>
                <div className="flex flex-col gap-4 rounded-3xl bg-white shadow p-8 text-right relative">
                    <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669] absolute top-8 left-8">5.2% +</Badge>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ECFDF5]">
                        <CircleCheck className="text-[#059669]"/>
                    </div>
                    <h2 className="text-[14px] font-medium text-neutral-900">الاشتراكات النشطة</h2>
                    <p className="text-[36px] font-black text-[#1E1B4B] -mt-6">
                        842
                    </p>
                </div>
                <div className="flex flex-col gap-4 rounded-3xl bg-white shadow p-8 text-right sm:col-span-2 xl:col-span-1 relative">
                    <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669] absolute top-8 left-8">2.4% -</Badge>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF7ED]">
                        <CircleAlert className="text-[#EA580C]"/>
                    </div>
                    <h2 className="text-[14px] font-medium text-neutral-900">الاشتراكات المنتهية</h2>
                    <p className="text-[36px] font-black text-[#1E1B4B] -mt-6">
                        42
                    </p>
                </div>
            </section>
            <section className="grid grid-cols-3 gap-8">
                <div className="flex flex-col gap-6 col-span-2">
                    <div className="relative">
                        <h2 className="text-[20px] font-bold text-brand-700">النشاط الأخير</h2>
                        <p className="text-[14px] text-neutral-700">
                            تحديثات فورية لحركة الجيم
                        </p>
                        <Link href={''} className="absolute bottom-0 left-0 text-[14px] font-bold text-brand-500">عرض الكل</Link>
                    </div>
                    <ul className="w-full bg-white rounded-xl shadow">
                        <li className="w-full flex justify-between items-center  p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-700 rounded-xl">

                                </div>
                                <div>
                                    <h3 className="text-[16px] font-bold text-[#1E1B4B]">سارة المنصوري</h3>
                                    <span className="text-[12px] text-neutral-700">تسجيل دخول • قبل 5 دقائق</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">VIP Member</Badge>
                                <EllipsisVertical className="cursor-pointer"/>
                            </div>
                        </li>
                        <li className="w-full flex justify-between items-center  p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-700 rounded-xl">

                                </div>
                                <div>
                                    <h3 className="text-[16px] font-bold text-[#1E1B4B]">عمر الخالدي</h3>
                                    <span className="text-[12px] text-neutral-700">تجديد اشتراك • قبل 2 ساعة</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">+ 1,200 ر.س</Badge>
                                <EllipsisVertical className="cursor-pointer"/>
                            </div>
                        </li>
                        <li className="w-full flex justify-between items-center  p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-700 rounded-xl">

                                </div>
                                <div>
                                    <h3 className="text-[16px] font-bold text-[#1E1B4B]">خالد السعد</h3>
                                    <span className="text-[12px] text-neutral-700">تسجيل دخول • قبل 3 ساعات</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">Standard</Badge>
                                <EllipsisVertical className="cursor-pointer"/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col justify-between gap-4 rounded-3xl bg-[#1E1B4B] shadow p-8 relative">
                    <div className="flex flex-col gap-4">
                        <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">نصيحة اليوم</Badge>
                        <h2 className="text-[24px] font-bold text-white">زيادة التفاعل</h2>
                        <p className="text-[16px] font-bold text-brand-50">
                            قم بإرسال تذكيرات تلقائية للأعضاء
                            الذين لم يحضروا منذ أكثر من 7 أيام
                            لزيادة معدل الاحتفاظ.
                        </p>
                    </div>
                    <Button variant="guest">تفعيل التذكير الذكي</Button>
                </div>
            </section>
            <section className="grid grid-cols-2 gap-8">
                <div className="flex flex-col items-center gap-4 rounded-3xl bg-[#F2F4F6] shadow p-8 text-right relative">
                    <h2 className="w-full text-start text-[16px] font-bold text-[#1E1B4B]">
                        حضور الحصص
                    </h2>
                    <ul className="w-full h-full flex flex-col gap-4 rounded-xl">
                        <li className="w-full flex justify-between items-center bg-white rounded-xl p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-700 rounded-xl">

                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-[#191C1E]">يوغا الصباح</h3>
                                    <span className="text-[10px] text-neutral-700">المدرب: أحمد</span>
                                </div>
                            </div>
                            <div className="text-left">
                                <h4 className="text-[14px] font-black text-[#1E1B4B]">18/20</h4>
                                <span className="text-[10px] text-neutral-700">مكتمل تقريباً</span>
                            </div>
                        </li>
                        <li className="w-full flex justify-between items-center bg-white rounded-xl p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-700 rounded-xl">

                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-[#191C1E]">تمارين القوة (HIIT)</h3>
                                    <span className="text-[10px] text-neutral-700">المدربة: سارة</span>
                                </div>
                            </div>
                            <div className="text-left">
                                <h4 className="text-[14px] font-black text-[#1E1B4B]">12/25</h4>
                                <span className="text-[10px] text-neutral-700">متاح</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-3xl bg-white shadow p-8 text-right relative">
                    <h2 className="w-full text-start text-[16px] font-bold text-[#1E1B4B]">
                        إشغال الصالة حالياً
                    </h2>
                    <div className="progress w-48 h-48 flex justify-center items-center rounded-full text-center"
                        style={{ "--progress": 68 } as React.CSSProperties}>
                        <div className="w-40 h-40 flex flex-col justify-center items-center rounded-full bg-white">
                            <h3 className="text-[36px] font-black text-brand-700">68%</h3>
                            <span className="text-[10px] font-bold text-neutral-700">معدل الإشغال</span>
                        </div>
                    </div>
                    <div
                        
                    ></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#F2F4F6] rounded-xl text-center px-16 py-3">
                            <h4 className="text-[12px] font-bold text-neutral-700">المتواجدون الآن</h4>
                            <span className="text-[18px] font-black text-brand-500">42</span>
                        </div>
                        <div className="bg-[#F2F4F6] rounded-xl text-center px-16 py-3">
                            <h4 className="text-[12px] font-bold text-neutral-700">السعة القصوى</h4>
                            <span className="text-[18px] font-black text-brand-700">65</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}