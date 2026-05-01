// ** Components
import AttendanceModal from "../components/AttendanceModal";
import CheckoutModal from "../components/CheckoutModal";
import AddMemberModal from "../components/AddMemberModal";
// ** Interfaces
import { AttendanceWithMember } from "@/types";
interface TitleProps{
    data: AttendanceWithMember[];
}


export default function Title({data}:TitleProps) {
    return (
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-[32px] font-black text-neutral-900 sm:text-[40px]">الأعضاء</h1>
            <div className="flex gap-4">
                <AddMemberModal />
            </div>
        </section>
    )
}