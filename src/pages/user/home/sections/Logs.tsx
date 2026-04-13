// ** Components
import Badge from "@/components/ui/Badge";
// ** Assets
import { EllipsisVertical } from "lucide-react";
// ** Hooks && Tools
import Link from "next/link";


export default function Logs() {
    return (
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
    )
}