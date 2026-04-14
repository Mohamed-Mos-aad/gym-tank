// ** Components
import Button from "@/components/ui/Button";



export default function Support() {
    return (
        <div className="relative flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-[#C7C4D8]/20 p-8 text-right shadow sm:p-8">
            <h2 className="text-[16px] text-neutral-700">هل تحتاج إلى مساعدة في الإعدادات؟</h2>
            <Button variant="guest" className="bg-[#E6E8EA] text-[#191C1E]">تحدث مع الدعم الفني</Button>
        </div>
    )
}