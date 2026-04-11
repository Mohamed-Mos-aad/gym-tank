import type { CSSProperties } from "react";

// ** Components
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CircleAlert, CircleCheck, EllipsisVertical, Plus, UsersRound } from "lucide-react";
import Link from "next/link";

export default function Home() {
    const progressStyle = { "--progress": 68 } as CSSProperties;

    return (
        <main className="flex flex-col gap-6 lg:gap-8">
            <section className="flex flex-col gap-6 rounded-2xl bg-linear-to-br from-brand-500 from-25% to-brand-700 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:p-12">
                <div className="flex flex-col gap-2">
                    <Badge className="bg-white/20 text-[10px] font-bold text-white">نظرة عامة</Badge>
                    <h1 className="text-[36px] font-black text-white">مرحبًا</h1>
                    <p className="text-[16px] text-brand-50">لديك 12 عضوًا جديدًا انضموا هذا الأسبوع. واصل التقدم الرائع!</p>
                </div>
                <Button variant="guest" className="flex w-full items-center justify-center gap-2 sm:w-fit">
                    <Plus className="text-brand-500" size={20} strokeWidth={3} />
                    إضافة عضو جديد
                </Button>
            </section>

            <section className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                    <Badge className="absolute top-8 left-8 bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">12% +</Badge>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10">
                        <UsersRound className="text-brand-500" />
                    </div>
                    <h2 className="text-[14px] font-medium text-neutral-900">إجمالي الأعضاء</h2>
                    <p className="-mt-6 text-[36px] font-black text-brand-700">1,284</p>
                </div>

                <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                    <Badge className="absolute top-8 left-8 bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">5.2% +</Badge>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ECFDF5]">
                        <CircleCheck className="text-[#059669]" />
                    </div>
                    <h2 className="text-[14px] font-medium text-neutral-900">الاشتراكات النشطة</h2>
                    <p className="-mt-6 text-[36px] font-black text-brand-700">842</p>
                </div>

                <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-6 text-right shadow sm:col-span-2 sm:p-8 xl:col-span-1">
                    <Badge className="absolute top-8 left-8 bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">2.4% -</Badge>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF7ED]">
                        <CircleAlert className="text-[#EA580C]" />
                    </div>
                    <h2 className="text-[14px] font-medium text-neutral-900">الاشتراكات المنتهية</h2>
                    <p className="-mt-6 text-[36px] font-black text-brand-700">42</p>
                </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-3 xl:gap-8">
                <div className="flex flex-col gap-6 xl:col-span-2">
                    <div className="relative">
                        <h2 className="text-[20px] font-bold text-brand-700">النشاط الأخير</h2>
                        <p className="text-[14px] text-neutral-700">تحديثات فورية لحركة الجيم</p>
                        <Link href="#" className="mt-2 inline-block text-[14px] font-bold text-brand-500 sm:absolute sm:bottom-0 sm:left-0 sm:mt-0">
                            عرض الكل
                        </Link>
                    </div>

                    <ul className="w-full rounded-xl bg-white shadow">
                        <li className="flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-brand-700"></div>
                                <div>
                                    <h3 className="text-[16px] font-bold text-brand-700">سارة المنصوري</h3>
                                    <span className="text-[12px] text-neutral-700">تسجيل دخول • قبل 5 دقائق</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 self-start sm:self-auto">
                                <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">VIP Member</Badge>
                                <EllipsisVertical className="cursor-pointer" />
                            </div>
                        </li>

                        <li className="flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-brand-700"></div>
                                <div>
                                    <h3 className="text-[16px] font-bold text-brand-700">عمر الخالدي</h3>
                                    <span className="text-[12px] text-neutral-700">تجديد اشتراك • قبل 2 ساعة</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 self-start sm:self-auto">
                                <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">+ 1,200 ر.س</Badge>
                                <EllipsisVertical className="cursor-pointer" />
                            </div>
                        </li>

                        <li className="flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-brand-700"></div>
                                <div>
                                    <h3 className="text-[16px] font-bold text-brand-700">خالد السعد</h3>
                                    <span className="text-[12px] text-neutral-700">تسجيل دخول • قبل 3 ساعات</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 self-start sm:self-auto">
                                <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">Standard</Badge>
                                <EllipsisVertical className="cursor-pointer" />
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="relative flex flex-col justify-between gap-4 rounded-3xl bg-brand-700 p-6 shadow sm:p-8">
                    <div className="flex flex-col gap-4">
                        <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">نصيحة اليوم</Badge>
                        <h2 className="text-[24px] font-bold text-white">زيادة التفاعل</h2>
                        <p className="text-[16px] font-bold text-brand-50">
                            قم بإرسال تذكيرات تلقائية للأعضاء الذين لم يحضروا منذ أكثر من 7 أيام لزيادة معدل الاحتفاظ.
                        </p>
                    </div>
                    <Button variant="guest" className="w-full sm:w-fit">
                        تفعيل التذكير الذكي
                    </Button>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                <div className="relative flex flex-col items-center gap-4 rounded-3xl bg-neutral-100 p-6 text-right shadow sm:p-8">
                    <h2 className="w-full text-start text-[16px] font-bold text-brand-700">حضور الحصص</h2>
                    <ul className="flex h-full w-full flex-col gap-4 rounded-xl">
                        <li className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-brand-700"></div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-neutral-900">يوغا الصباح</h3>
                                    <span className="text-[10px] text-neutral-700">المدرب: أحمد</span>
                                </div>
                            </div>
                            <div className="self-start text-left sm:self-auto">
                                <h4 className="text-[14px] font-black text-brand-700">18/20</h4>
                                <span className="text-[10px] text-neutral-700">مكتمل تقريبًا</span>
                            </div>
                        </li>

                        <li className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-brand-700"></div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-neutral-900">تمارين القوة (HIIT)</h3>
                                    <span className="text-[10px] text-neutral-700">المدربة: سارة</span>
                                </div>
                            </div>
                            <div className="self-start text-left sm:self-auto">
                                <h4 className="text-[14px] font-black text-brand-700">12/25</h4>
                                <span className="text-[10px] text-neutral-700">متاح</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="relative flex flex-col items-center gap-4 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                    <h2 className="w-full text-start text-[16px] font-bold text-brand-700">إشغال الصالة حاليًا</h2>
                    <div className="progress flex h-48 w-48 items-center justify-center rounded-full text-center" style={progressStyle}>
                        <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-white">
                            <h3 className="text-[36px] font-black text-brand-700">68%</h3>
                            <span className="text-[10px] font-bold text-neutral-700">معدل الإشغال</span>
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl bg-neutral-100 px-6 py-3 text-center sm:px-10">
                            <h4 className="text-[12px] font-bold text-neutral-700">المتواجدون الآن</h4>
                            <span className="text-[18px] font-black text-brand-500">42</span>
                        </div>
                        <div className="rounded-xl bg-neutral-100 px-6 py-3 text-center sm:px-10">
                            <h4 className="text-[12px] font-bold text-neutral-700">السعة القصوى</h4>
                            <span className="text-[18px] font-black text-brand-700">65</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
