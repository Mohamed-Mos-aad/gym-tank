"use client";
// ** Assets
import { Clock, Plus } from "lucide-react";
// ** Components
import Select from "@/components/ui/Select";
import Modal from "@/components/popUp/Modal";
import Button from "@/components/ui/Button";
// ** Hooks && Tools
import { useState } from "react";
// ** Actions
import { createCheckoutAction } from "@/actions/user/attendance.actions";
// ** Interfaces
import { AttendanceWithMember } from "@/types";
import Toast from "@/components/ui/Toast";
interface CheckoutModalProps{
    data: AttendanceWithMember[];
}


export default function CheckoutModal({data}:CheckoutModalProps) {
    // ** States
    const attendanceData = data?? [];
    const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState("");
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);
    


    // ** Handlers
    const toggleAttendanceModal = () => {
        setAttendanceModalOpen((prev) => !prev);
    };
    const submitHandler = async () => {
        if (!selectedMemberId) {
            setToast({ message: "اختار عضو الأول ❗", type: "error" });
            return;
        }
    
        try {
            await createCheckoutAction(selectedMemberId);
            setToast({ message: "تم تسجيل الانصراف ✅", type: "success" });
            setTimeout(() => toggleAttendanceModal(), 1500);
        } catch (err: any) {
            setToast({ message: err.message || "حدث خطأ", type: "error" });
        }
    };
    



    return (
        <>
        <Button
            variant="primary"
            className="flex w-full items-center justify-center gap-2 sm:w-fit"
            onClick={toggleAttendanceModal}
        >
            <Plus className="text-white" size={20} strokeWidth={3} />
            تسجيل انصراف
        </Button>
        {
            attendanceModalOpen && (
                <Modal>
                <h1 className="text-[20px] sm:text-[24px] font-bold text-[#191C1E]">
                    تسجيل انصراف العضو
                </h1>

                <Select
                    label="اختيار العضو"
                    id="memberName"
                    value={selectedMemberId}
                    placeholder="ابحث عن اسم العضو أو رقم الهاتف..."
                    options={attendanceData.map((attendance) => ({
                        label: `${attendance.member.name} - ${attendance.member.phone}`,
                        value: attendance.memberId,
                    }))}
                    onChange={(val) => setSelectedMemberId(String(val))}
                />

                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#F2F4F6] border border-[#191C1E]/10 rounded-xl py-4 px-6">
                    <h2 className="flex items-center gap-4 text-[14px] sm:text-[16px] text-neutral-700">
                    <Clock strokeWidth={1.5} />
                    وقت تسجيل الانصراف:
                    </h2>
                    <span className="text-[16px] text-[#191C1E]">
                    {new Date().toLocaleTimeString()}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                    variant="primary"
                    className="w-full py-3 sm:py-4"
                    onClick={submitHandler}
                    >
                    تأكيد
                    </Button>

                    <Button
                    variant="guest"
                    className="w-full py-3 sm:py-4"
                    onClick={toggleAttendanceModal}
                    >
                    إلغاء
                    </Button>
                </div>
                </Modal>
            )}

        {toast && (
            <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
            />
        )}
        </>
    );
}