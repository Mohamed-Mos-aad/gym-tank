"use client";
// ** Assets
import { Clock, Plus } from "lucide-react";
// ** Components
import Select from "@/components/ui/Select";
import Modal from "@/components/popUp/Modal";
import Button from "@/components/ui/Button";
// ** Hooks && Tools
import { useEffect, useState } from "react";
// ** Actions
import {
  getMembersListAction,
} from "../../../../actions/user.actions";
import { createAttendanceAction } from "@/actions/user/attendance.actions";
// ** Interfaces
import { MemberLite } from "@/types";



export default function AttendanceModal() {
  // ** States
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [membersData, setMembersData] = useState<MemberLite[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState("");

  // ** Handlers
  const getMembersDataAction = async () => {
    const res = await getMembersListAction();
    setMembersData(res.data);
  };
  const toggleAttendanceModal = () => {
    setAttendanceModalOpen((prev) => !prev);
  };
  const submitHandler = async () => {
    if (!selectedMemberId) {
      alert("اختار عضو الأول ❗");
      return;
    }

    try {
      await createAttendanceAction(selectedMemberId);
      alert("تم تسجيل الحضور ✅");
      toggleAttendanceModal();
    } catch (err) {
      alert(err.message);
    }
  };

  // ** Effects
  useEffect(() => {
    const fetchData = () => {
      getMembersDataAction();
    };
    fetchData();
  }, []);



  return (
    <>
      <Button
        variant="primary"
        className="flex w-full items-center justify-center gap-2 sm:w-fit"
        onClick={toggleAttendanceModal}
      >
        <Plus className="text-white" size={20} strokeWidth={3} />
        تسجيل حضور
      </Button>
      {attendanceModalOpen && (
        <Modal>
          <h1 className="text-[20px] sm:text-[24px] font-bold text-[#191C1E]">
            تسجيل حضور العضو
          </h1>

          <Select
            label="اختيار العضو"
            id="memberName"
            value={selectedMemberId}
            placeholder="ابحث عن اسم العضو أو رقم الهاتف..."
            options={membersData.map((m) => ({
              label: `${m.name} - ${m.phone}`,
              value: m.id,
            }))}
            onChange={(val) => setSelectedMemberId(String(val))}
          />

          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#F2F4F6] border border-[#191C1E]/10 rounded-xl py-4 px-6">
            <h2 className="flex items-center gap-4 text-[14px] sm:text-[16px] text-neutral-700">
              <Clock strokeWidth={1.5} />
              وقت تسجيل الدخول:
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
    </>
  );
}
