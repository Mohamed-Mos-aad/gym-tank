// ** Components
import Badge from "@/components/ui/Badge";
// ** Assets
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
// ** Interfaces
import { MemberLite } from "@/types";
interface TableProps{
    data: MemberLite[];
}


export default function Table({data}:TableProps) {
    return (
        <section className="overflow-hidden rounded-2xl bg-white shadow">
            <h2 className="border-b border-neutral-200 px-4 py-5 text-[18px] font-bold text-neutral-900 sm:px-6">
                جدول البيانات
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full min-w-190">
                    <thead>
                    <tr className="border-b border-neutral-200">
                        <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                        اسم المشترك
                        </th>
                        <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                        نوع الاشتراك
                        </th>
                        <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                        تاريخ البدء
                        </th>
                        <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                        تاريخ الانتهاء
                        </th>
                        <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                        الحالة
                        </th>
                        <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                        الإجراءات
                        </th>
                    </tr>
                    </thead>
                        <tbody>
                        {!data || !data || data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-neutral-500">
                                    لا يوجد بيانات
                                </td>
                            </tr>
                        ) : (
                            data.map((member) => (
                                <tr
                                key={member.id}
                                className="border-b border-neutral-100 last:border-b-0"
                                >
                                <td className="px-6 py-4 text-[16px] font-bold text-neutral-900">
                                    {member.name}
                                </td>
                                <td className="px-6 py-4 text-[16px] font-medium text-neutral-700">
                                    {
                                        member.subscriptionType && 
                                        <Badge className="border border-info-600/20 bg-info-600/10 text-[12px] font-bold text-info-600">
                                        {member.subscriptionType}
                                        </Badge>
                                    }
                                </td>
                                <td className="px-6 py-4 text-[14px] text-neutral-700">
                                    {member.startDate.toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-[14px] text-neutral-700">
                                    {member.endDate?.toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-[16px] font-bold text-neutral-900">
                                    <Badge className="border border-info-600/20 bg-info-600/10 text-[12px] font-bold text-info-600">
                                    {member.subscriptionStatus}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                    <MoreHorizontal size={20} />
                                    </button>
                                </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex w-full justify-center border-t border-neutral-200 px-4 py-4 sm:justify-between sm:px-6">
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
    )
}