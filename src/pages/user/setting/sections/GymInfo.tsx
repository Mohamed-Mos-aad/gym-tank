// ** Assets
import { Dumbbell } from "lucide-react";
// ** Components
import Input from '@/components/ui/Input';
// ** Interfaces
interface GymInfoProps{
    name: string;
    specialty: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
}



export default function GymInfo({name, specialty, phone, email, address}:GymInfoProps) {
    return (
        <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-8 text-right shadow sm:p-8">
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 flex justify-center items-center rounded-lg bg-[#EEF2FF]">
                    <Dumbbell className="text-brand-500"/>
                </div>
                <div>
                    <h2 className="text-[20px] font-bold text-neutral-900">معلومات النادي</h2>
                    <p className="text-[12px] text-neutral-700">البيانات العامة التي تظهر للمشتركين وفي التقارير.</p>
                </div>
            </div>
            <form className="flex flex-col gap-4">
                <Input id="gymName" label="اسم النادي الرياضي" type="text" defaultValue={name}/>
                <Input id="gymSpeicla" label="التخصص" type="text" defaultValue={specialty?? ''}/>
                <Input id="gymPhone" label="رقم التواصل الرئيسي" type="text" defaultValue={phone?? ''}/>
                <Input id="gymEmail" label="البريد الإلكتروني للنادي" type="text" defaultValue={email?? ''}/>
                <Input id="gymAddress" label="العنوان" type="text" defaultValue={address?? ''}/>
            </form>
        </div>
    )
}