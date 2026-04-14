// ** Assets
import { RotateCcwKey, UserRound } from "lucide-react";
// ** Components
import Input from '@/components/ui/Input';
import Link from "next/link";
// ** Interfaces
interface OwnerInfoProps{
    ownerName?: string;
    ownerEmail?: string;
}



export default function OwnerInfo({ownerName, ownerEmail}:OwnerInfoProps) {
    return (
        <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-8 text-right shadow sm:p-8">
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 flex justify-center items-center rounded-lg bg-[#FFDBCC]">
                    <UserRound className="text-[#7E3000]"/>
                </div>
                <div>
                    <h2 className="text-[20px] font-bold text-neutral-900">الملف الشخصي للمالك</h2>
                    <p className="text-[12px] text-neutral-700">بيانات حسابك الشخصي ووسيلة تسجيل الدخول.</p>
                </div>
            </div>
            <form className="flex flex-col gap-4">
                <Input id="gymOwnerName" label="اسم المالك الكامل" type="text" defaultValue={ownerName}/>
                <Input id="gymOwnerEmail" label="البريد الإلكتروني للحساب" type="text" defaultValue={ownerEmail}/>
            </form>
            <Link href={"#"} className="flex items-center gap-2 text-[14px] font-bold text-brand-500">
                <RotateCcwKey width={20}/>
                تغيير كلمة المرور
            </Link>
        </div>
    )
}