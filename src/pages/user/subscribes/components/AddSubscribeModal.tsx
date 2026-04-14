"use client";
// ** Components
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Modal from "@/components/popUp/Modal";
import DatePicker from "@/components/ui/DatePicker";
// ** Assets
import { Plus } from "lucide-react";
// ** Hooks && Tools
import { useState } from "react";
// ** Actions
import {
  getMembersListAction,
  updateMemberAction,
} from "../../../../actions/user.actions";
// ** Interfaces
import { MemberLite } from "@/types";
interface ModalProps {
  id: string | number;
  type: "monthly" | "3Months" | "special";
  startDate?: number;
  endDate?: number;
}

export default function AddSubscribeModal() {
  // ** States
  const [membersData, setMembersData] = useState<MemberLite[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalProps>({
    id: "",
    type: "monthly",
    startDate: new Date().getTime(),
  });

  // ** Handlers
  const getMembersDataAction = async () => {
    const res = await getMembersListAction();
    setMembersData(res.data);
  };
  const modalStateToggleHandler = () => {
    setModalOpen((prev) => !prev);
  };
  const updateSubscriptionData = (newData: Partial<ModalProps>) => {
    setModalData((prev) => {
      const updated = { ...prev, ...newData };
      if (updated.type !== "special" && updated.startDate) {
        const start = new Date(updated.startDate);
        const end = new Date(updated.startDate);

        if (updated.type === "monthly") {
          end.setMonth(start.getMonth() + 1);
        } else if (updated.type === "3Months") {
          end.setMonth(start.getMonth() + 3);
        }
        updated.endDate = end.getTime();
      }

      return updated;
    });
  };
  const changeModalTypeHandler = (id: "monthly" | "3Months" | "special") => {
    updateSubscriptionData({ type: id });
  };
  const membersListHandler = () => {
    const options: { label: string; value: string }[] = [];
    membersData.map((member) => {
      options.push({
        label: member.name,
        value: member.id,
      });
    });
    return options;
  };
  const updateMemberActionHandler = async () => {
    if (!modalData.id) return;
    await updateMemberAction(modalData.id, {
      subscriptionType: modalData.type,
      startDate: modalData.startDate
        ? new Date(modalData.startDate)
        : undefined,
      endDate: modalData.endDate ? new Date(modalData.endDate) : undefined,
    });
    await getMembersDataAction();
    modalStateToggleHandler();
  };

  return (
    <>
      <Button
        variant="primary"
        className="flex w-full items-center justify-center gap-2 sm:w-fit"
        onClick={modalStateToggleHandler}
      >
        <Plus className="text-white" size={20} strokeWidth={3} />
        إضافة اشتراك جديد
      </Button>
      {modalOpen && (
        <Modal>
          <h1 className="text-[20px] sm:text-[24px] font-bold text-[#191C1E]">
            إضافة اشتراك جديد
          </h1>

          <Select
            label="اختيار العضو"
            id="memberName"
            placeholder="ابحث عن اسم العضو أو رقم الهاتف..."
            options={membersListHandler()}
            onChange={(value) => {
              setModalData((prev) => ({
                ...prev,
                id: value,
              }));
            }}
          />

          <div className="flex flex-col gap-2">
            <h2 className="text-[14px] sm:text-[16px] font-bold text-neutral-700">
              نوع الاشتراك
            </h2>

            <div className="flex gap-1 bg-[#F2F4F6] p-1.5 rounded-xl flex-wrap sm:flex-nowrap">
              <h3
                onClick={() => changeModalTypeHandler("monthly")}
                className={`w-full sm:w-1/3 text-center rounded-lg text-[14px] sm:text-[16px] ${
                  modalData.type === "monthly"
                    ? "bg-white text-brand-500 font-bold"
                    : "text-neutral-700"
                } py-2.5 cursor-pointer`}
              >
                شهري
              </h3>

              <h3
                onClick={() => changeModalTypeHandler("3Months")}
                className={`w-full sm:w-1/3 text-center rounded-lg text-[14px] sm:text-[16px] ${
                  modalData.type === "3Months"
                    ? "bg-white text-brand-500 font-bold"
                    : "text-neutral-700"
                } py-2.5 cursor-pointer`}
              >
                3 شهور
              </h3>

              <h3
                onClick={() => changeModalTypeHandler("special")}
                className={`w-full sm:w-1/3 text-center rounded-lg text-[14px] sm:text-[16px] ${
                  modalData.type === "special"
                    ? "bg-white text-brand-500 font-bold"
                    : "text-neutral-700"
                } py-2.5 cursor-pointer`}
              >
                مخصص
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DatePicker
              label="تاريخ البدء"
              id="startDate"
              value={modalData.startDate}
              onChange={(date) =>
                updateSubscriptionData({ startDate: date.getTime() })
              }
            />

            <DatePicker
              label="تاريخ الانتهاء"
              id="endDate"
              value={modalData.endDate}
              onChange={(date) =>
                updateSubscriptionData({ endDate: date.getTime() })
              }
            />
          </div>

          <div className="bg-[#3525CD]/5 border border-[#3525CD]/10 rounded-xl p-4 sm:p-6">
            <h2 className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center text-[14px] sm:text-[16px] font-bold text-neutral-700 gap-2">
              المبلغ الإجمالي
              <span className="text-[24px] sm:text-[30px] text-brand-500">
                450 <span className="text-[12px] sm:text-[14px]"> ر.س</span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              variant="primary"
              className="w-full py-3 sm:py-4"
              onClick={updateMemberActionHandler}
            >
              حفظ الاشتراك
            </Button>

            <Button
              variant="guest"
              className="w-full py-3 sm:py-4"
              onClick={modalStateToggleHandler}
            >
              إلغاء
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
