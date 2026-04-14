// ** Components
import Badge from "@/components/ui/Badge";
// ** Assets
import AddMemberModal from "../components/AddMemberModal";



export default function Welcome() {
    return (
        <section className="flex flex-col gap-6 rounded-2xl bg-linear-to-br from-brand-500 from-25% to-brand-700 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:p-12">
            <div className="flex flex-col gap-2">
                <Badge className="bg-white/20 text-[10px] font-bold text-white">نظرة عامة</Badge>
                <h1 className="text-[36px] font-black text-white">مرحبًا</h1>
                <p className="text-[16px] text-brand-50">لديك 12 عضوًا جديدًا انضموا هذا الأسبوع. واصل التقدم الرائع!</p>
            </div>
            <AddMemberModal />
        </section>
    )
}