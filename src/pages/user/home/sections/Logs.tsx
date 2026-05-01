// ** Components
import Badge from "@/components/ui/Badge";
// ** Assets
import { EllipsisVertical } from "lucide-react";
// ** Hooks && Tools
import Link from "next/link";


export default function Logs({ data }: { data: any[] }) {
    return (
        <div className="flex flex-col gap-6 xl:col-span-2">
            <div className="relative">
                <h2 className="text-[20px] font-bold text-brand-700">النشاط الأخير</h2>
                <p className="text-[14px] text-neutral-700">تحديثات فورية لحركة الجيم</p>
                <Link href="/user/logs" className="mt-2 inline-block text-[14px] font-bold text-brand-500 sm:absolute sm:bottom-0 sm:left-0 sm:mt-0">
                    عرض الكل
                </Link>
            </div>

            <ul className="w-full rounded-xl bg-white shadow overflow-hidden">
                {data && data.length > 0 ? data.map((log) => (
                    <li key={log.id} className="flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-50 last:border-0 hover:bg-neutral-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500 font-black">
                                {log.memberName.substring(0, 1)}
                            </div>
                            <div>
                                <h3 className="text-[16px] font-bold text-brand-700">{log.memberName}</h3>
                                <span className="text-[12px] text-neutral-700">{log.type} • {new Intl.DateTimeFormat('ar-EG', { timeStyle: 'short' }).format(new Date(log.time))}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 self-start sm:self-auto">
                            <Badge className="bg-[#ECFDF5] text-[12px] font-bold text-[#059669]">{log.badge}</Badge>
                            <EllipsisVertical className="cursor-pointer text-neutral-400" />
                        </div>
                    </li>
                )) : (
                    <div className="p-8 text-center text-neutral-500 text-sm font-bold">
                        لا يوجد نشاط مسجل اليوم حتى الآن.
                    </div>
                )}
            </ul>
        </div>
    )
}