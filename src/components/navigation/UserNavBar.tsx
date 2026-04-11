// ** Assets
import { Bell, User } from "lucide-react";



export default function UserNavBar() {
    return (
        <nav className="w-full flex justify-between items-center px-6 py-3 border border-[#F1F5F9] shadow">
            <input type="search" name="" id="" className="w-md rounded-xl bg-neutral-100 pt-2.5 pr-10 pb-2.25 pl-4" placeholder="بحث عن عضو، اشتراك..."/>
            <div className="flex items-center gap-4">
                <Bell className="cursor-pointer"/>
                <div>
                    <h1 className="text-[14px] font-bold text-[#0F172A]">أحمد علي</h1>
                    <h2 className="text-[10px] text-neutral-700">مدير النظام</h2>
                </div>
                <div className="w-8 h-8 flex justify-center items-center bg-[#20252A] rounded-full cursor-pointer">
                    <User className="text-white"/>
                </div>
            </div>
        </nav>
    )
}