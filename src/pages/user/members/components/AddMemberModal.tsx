'use client'
// ** Assets
import { Plus } from "lucide-react";
// ** Components
import Modal from "@/components/popUp/Modal";
import Button from "@/components/ui/Button";
// ** Hooks && Tools
import { useState } from "react";
import { useRouter } from "next/navigation";
// ** Actions
import { createMemberAction } from "../../../../../actions/user.actions";
// ** Interfaces
import Input from "@/components/ui/Input";



export default function AddMemberModal() {
    // ** Hooks && Tools 
    const router = useRouter();



    // ** States
    const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
    const [newMember, setNewMember] = useState({
        name: '',
        phone: '',
    });



    // ** Handlers
    const toggleAddMemberModal = () => {
        setAddMemberModalOpen(prev => !prev)
    }
    const saveMemberHandler = async ()=>{
        if(!newMember.name) return
        await createMemberAction(newMember);
        router.refresh();
        toggleAddMemberModal();
    }



    return (
        <>
            <Button variant="primary" className="flex w-full items-center justify-center gap-2 sm:w-fit" onClick={toggleAddMemberModal}>
                <Plus className="text-white" size={20} strokeWidth={3} />
                إضافة عضو جديد
            </Button>
            {
                addMemberModalOpen &&
                <Modal>
                    <h1 className="text-[20px] sm:text-[24px] font-bold text-[#191C1E]">
                        إضافة عضو جديد
                    </h1>

                    <Input type="text"
                        id="memberName"
                        placeholder="اسم العضو"
                        label="اسم العضو"
                        value={newMember.name}
                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    />
                    <Input type="text"
                        id="memberPhone"
                        placeholder="رقم الهاتف"
                        label="رقم الهاتف"
                        value={newMember.phone}
                        onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                    />
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button variant="primary" className="w-full py-3 sm:py-4" onClick={saveMemberHandler}>
                            حفظ
                        </Button>
                        <Button
                            variant="guest"
                            className="w-full py-3 sm:py-4"
                            onClick={toggleAddMemberModal}
                        >
                            إلغاء
                        </Button>
                    </div>
                </Modal>
            }
        </>
    )
}