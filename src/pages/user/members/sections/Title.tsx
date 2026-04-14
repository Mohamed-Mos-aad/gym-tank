// ** Components
import AddMemberModal from "../components/AddMemberModal";
import AttendanceModal from "../components/AttendanceModal";



export default function Title() {
    return (
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-[32px] font-black text-neutral-900 sm:text-[40px]">الأعضاء</h1>
            <div className="flex gap-4">
                <AttendanceModal />
                <AddMemberModal />
            </div>
        </section>
    )
}