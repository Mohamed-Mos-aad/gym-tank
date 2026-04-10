// ** Components
import Link from "next/link";
import Button from "../ui/Button";



export default function NavBar() {
    return (
        <nav className="flex justify-between px-12 py-5">
            <h1 className="text-2xl font-black text-primary">جيم تانك</h1>
            <ul className="flex gap-8 text-[16px] font-bold">
                <li className="text-primary cursor-pointer">الرئيسية</li>
                <li className="cursor-pointer">المميزات</li>
                <li className="cursor-pointer">الأسعار</li>
                <li className="cursor-pointer">اتصل بنا</li>
            </ul>
            <div className="flex gap-4">
                <Button variant="guest"><Link href={"/"}>تسجيل الدخول</Link></Button>
                <Button variant="primary"><Link href={"/"}>ابدأ الآن</Link></Button>
            </div>
        </nav>
    )
}