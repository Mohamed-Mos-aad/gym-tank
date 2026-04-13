// ** Components
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";



export default function Tips() {
    return (
        <div className="relative flex flex-col justify-between gap-4 rounded-3xl bg-brand-700 p-6 shadow sm:p-8">
            <div className="flex flex-col gap-4">
                <Badge className="bg-white/20 text-[12px] font-bold text-white">نصيحة اليوم</Badge>
                <h2 className="text-[24px] font-bold text-white">زيادة التفاعل</h2>
                <p className="text-[16px] font-bold text-brand-50">
                    قم بإرسال تذكيرات تلقائية للأعضاء الذين لم يحضروا منذ أكثر من 7 أيام لزيادة معدل الاحتفاظ.
                </p>
            </div>
            <Button variant="guest" className="w-full sm:w-fit">
                تفعيل التذكير الذكي
            </Button>
        </div>
    )
}
