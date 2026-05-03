"use client";

// ** Assets
import { Plus, User, Phone, CreditCard, Calendar, ChevronDown } from "lucide-react";
// ** Components
import Modal from "@/components/popUp/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CustomSelect from "@/components/ui/Select";
// ** Hooks && Tools
import { useState } from "react";
import { useRouter } from "next/navigation";
// ** Actions
import { createMemberAction } from "@/actions/user/user.actions";
import Toast from "@/components/ui/Toast";

interface AddMemberModalProps {
    memberSubscriptionTypes?: string[];
}

export default function AddMemberModal({ memberSubscriptionTypes = ["عادي"] }: AddMemberModalProps) {
  // ** Hooks && Tools
  const router = useRouter();

  // ** States
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    phone: "",
    subscriptionType: memberSubscriptionTypes[0] || "عادي",
    months: 1,
  });
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

  // ** Handlers
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
    setNewMember({ name: "", phone: "", subscriptionType: memberSubscriptionTypes[0] || "عادي", months: 1 });
  };

  const saveMemberHandler = async () => {
    if (!newMember.name || !newMember.phone) {
        setToast({ message: "يرجى إدخال الاسم ورقم الهاتف", type: "error" });
        return;
    }
    
    setLoading(true);
    try {
        await createMemberAction(newMember);
        setToast({ message: "تمت الإضافة بنجاح ✅", type: "success" });
        router.refresh();
        setTimeout(() => toggleModal(), 1500);
    } catch (error) {
        setToast({ message: "حدث خطأ أثناء إضافة العضو", type: "error" });
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        className="flex w-full items-center justify-center gap-2 sm:w-fit px-8 py-4 rounded-2xl font-black shadow-lg shadow-brand-500/20"
        onClick={toggleModal}
      >
        <Plus className="text-white" size={20} strokeWidth={3} />
        إضافة عضو جديد
      </Button>

      {isOpen && (
        <Modal>
          <div className="flex flex-col gap-6 p-2">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-black text-neutral-900">إضافة عضو جديد</h1>
                <p className="text-sm text-neutral-500 font-bold">أدخل بيانات العضو الجديد لتفعيل اشتراكه</p>
            </div>

            <div className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                        type="text"
                        id="memberName"
                        placeholder="الاسم الكامل"
                        label="اسم العضو"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    />
                    <Input
                        type="text"
                        id="memberPhone"
                        placeholder="01xxxxxxxxx"
                        label="رقم الهاتف"
                        value={newMember.phone}
                        onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <CustomSelect 
                        label="نوع الاشتراك"
                        value={newMember.subscriptionType}
                        onChange={(val) => setNewMember({ ...newMember, subscriptionType: val })}
                        options={memberSubscriptionTypes.map(t => ({ label: t, value: t }))}
                        icon={<CreditCard size={18} />}
                    />
                    <CustomSelect 
                        label="مدة الاشتراك"
                        value={newMember.months}
                        onChange={(val) => setNewMember({ ...newMember, months: val })}
                        options={[
                            { label: "سيشن (يوم واحد)", value: 0 },
                            { label: "شهر واحد", value: 1 },
                            { label: "3 شهور", value: 3 },
                            { label: "6 شهور", value: 6 },
                            { label: "سنة كاملة", value: 12 }
                        ]}
                        icon={<Calendar size={18} />}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                    variant="primary"
                    className="flex-1 py-4 rounded-2xl font-black text-lg"
                    onClick={saveMemberHandler}
                    disabled={loading}
                >
                    {loading ? "جاري الحفظ..." : "تأكيد الإضافة"}
                </Button>
                <Button
                    variant="guest"
                    className="flex-1 py-4 rounded-2xl font-black text-lg border-neutral-200"
                    onClick={toggleModal}
                    disabled={loading}
                >
                    إلغاء
                </Button>
            </div>
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
