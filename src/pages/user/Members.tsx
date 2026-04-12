// ** Assets
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
// ** Components
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
// ** Actions
import { getMembersListAction } from "../../../actions/user.actions";



export default async function Members() {
    const { data } = await getMembersListAction();

    console.log(data);



    return (
        <main className="flex flex-col gap-6 lg:gap-8">
            <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-[32px] font-black text-neutral-900 sm:text-[40px]">الأعضاء</h1>
                <Button variant="primary" className="flex w-full items-center justify-center gap-2 sm:w-fit">
                    <Plus className="text-white" size={20} strokeWidth={3} />
                    إضافة عضو جديد
                </Button>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                    <h2 className="text-[16px] font-bold text-neutral-700">إجمالي الأعضاء</h2>
                    <h3 className="text-[30px] font-black text-neutral-900">
                        1,284
                        <span className="text-[12px] font-bold text-info-600"> 12%+ </span>
                    </h3>
                </div>
                <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                    <h2 className="text-[16px] font-bold text-neutral-700">اشتراكات نشطة</h2>
                    <h3 className="text-[30px] font-black text-neutral-900">
                        942
                        <span className="text-[12px] font-bold text-info-600"> عضو </span>
                    </h3>
                </div>
                <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                    <h2 className="text-[16px] font-bold text-neutral-700">منتهية الصلاحية</h2>
                    <h3 className="text-[30px] font-black text-neutral-900">
                        342
                        <span className="text-[12px] font-bold text-info-600"> متابعة </span>
                    </h3>
                </div>
                <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                    <h2 className="text-[16px] font-bold text-neutral-700">الآن في الجيم</h2>
                    <h3 className="text-[30px] font-black text-neutral-900">42</h3>
                </div>
            </section>

            <section className="overflow-hidden rounded-2xl bg-white shadow">
                <h2 className="border-b border-neutral-200 px-4 py-5 text-[18px] font-bold text-neutral-900 sm:px-6">
                    جدول البيانات
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-190">
                        <thead>
                            <tr className="border-b border-neutral-200">
                                <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">الاسم</th>
                                <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">رقم الهاتف</th>
                                <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">حالة الاشتراك</th>
                                <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">تاريخ البدء</th>
                                <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">تاريخ الانتهاء</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((member) => (
                                <tr key={`${member.name}-${member.phone}`} className="border-b border-neutral-100 last:border-b-0">
                                    <td className="px-6 py-4 text-[16px] font-bold text-neutral-900">
                                        <div className="flex flex-col">
                                            {member.name}
                                            <span className="text-[12px] font-normal text-neutral-700">{member.subscriptionType}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[16px] font-medium text-neutral-700">{member.phone}</td>
                                    <td className="px-6 py-4 text-[16px] font-bold text-neutral-900">
                                        <Badge className="border border-info-600/20 bg-info-600/10 text-[12px] font-bold text-info-600">
                                            {member.subscriptionStatus}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-[14px] text-neutral-700">{member.startDate.toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-[14px] text-neutral-700">{member.endDate?.toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full flex justify-center sm:justify-between border-t border-neutral-200 px-4 py-4 sm:px-6">
                    <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="text-center text-[14px] font-medium text-neutral-700">
                            عرض 1 إلى 10 من أصل 1,284 عضواً
                        </h4>

                        <div className="flex justify-center items-center gap-2">
                            <button
                                type="button"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition-colors hover:border-brand-500 hover:text-brand-500"
                                aria-label="الصفحة السابقة"
                            >
                                <ChevronRight size={16} />
                            </button>
                            <button
                                type="button"
                                className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-brand-500 px-3 text-[14px] font-bold text-white"
                            >
                                1
                            </button>
                            <button
                                type="button"
                                className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-neutral-200 px-3 text-[14px] font-bold text-neutral-700 transition-colors hover:border-brand-500 hover:text-brand-500"
                            >
                                2
                            </button>
                            <button
                                type="button"
                                className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-neutral-200 px-3 text-[14px] font-bold text-neutral-700 transition-colors hover:border-brand-500 hover:text-brand-500"
                            >
                                3
                            </button>
                            <button
                                type="button"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition-colors hover:border-brand-500 hover:text-brand-500"
                                aria-label="الصفحة التالية"
                            >
                                <ChevronLeft size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
