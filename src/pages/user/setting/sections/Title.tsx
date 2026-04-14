// ** Assets
import { Save } from "lucide-react";
// ** Components
import Button from "@/components/ui/Button";



export default function Title() {
    return (
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
    )
}
