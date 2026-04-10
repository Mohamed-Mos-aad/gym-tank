// ** Hooks && Tools
import Link from "next/link";
// ** Assets
import { Earth, MessageSquareText, SendHorizontal, Share2 } from "lucide-react";
import Button from "@/components/ui/Button";



export default function Footer() {
    return (
        <footer className="bg-[#F2F4F6] px-12 py-20">
            <div className="grid grid-cols-4 gap-12">
                <div className="flex flex-col gap-6">
                    <h1 className="text-[30px] font-black text-primary">جيم تانك</h1>
                    <p className="text-[16px] text-[#464555]">
                        المنصة الرائدة في الشرق الأوسط لإدارة
                        المنشآت الرياضية بكل ذكاء وسهولة.
                    </p>
                    <div className="flex gap-4">
                        <Link href={""} className="w-10 h-10 flex justify-center items-center bg-[#ECEEF0] rounded-full"><Share2 className="w-5 text-[#191C1E]" /></Link>
                        <Link href={""} className="w-10 h-10 flex justify-center items-center bg-[#ECEEF0] rounded-full"><MessageSquareText className="w-5 text-[#191C1E]" /></Link>
                        <Link href={""} className="w-10 h-10 flex justify-center items-center bg-[#ECEEF0] rounded-full"><Earth className="w-5 text-[#191C1E]" /></Link>
                    </div>
                </div>
                <ul className="flex flex-col gap-4 text-[16px] text-[#464555] mb-2">
                    <h2 className="text-[18px] font-bold text-[#191C1E] mb-2">المنتج</h2>
                    <li><Link href={""}>المميزات</Link></li>
                    <li><Link href={""}>الأسعار</Link></li>
                    <li><Link href={""}>التحديثات</Link></li>
                    <li><Link href={""}>التحديثات</Link></li>
                </ul>
                <ul className="flex flex-col gap-4 text-[16px] text-[#464555] mb-2">
                    <h2 className="text-[18px] font-bold text-[#191C1E] mb-2">الشركة</h2>
                    <li><Link href={""}>من نحن</Link></li>
                    <li><Link href={""}>اتصل بنا</Link></li>
                    <li><Link href={""}>الشروط والأحكام</Link></li>
                    <li><Link href={""}>سياسة الخصوصية</Link></li>
                </ul>
                <div className="flex flex-col gap-6">
                    <h2 className="text-[18px] font-bold text-[#191C1E]">اشترك في النشرة</h2>
                    <p className="text-[16px] text-[#464555]">
                        احصل على آخر نصائح إدارة الجيمات والمنشآت
                        الرياضية.
                    </p>
                    <div className="flex gap-2">
                        <input type="text" name="email" id="email" className="w-full bg-white px-4 py-3 rounded-xl" placeholder="بريدك الإلكتروني"/>
                        <Button variant="primary"><SendHorizontal size={20}/></Button>
                    </div>
                </div>
            </div>
            <h3 className="text-[14px] text-[#464555] text-center mt-16">جميع الحقوق محفوظة. © 2026 GymTank.</h3>
        </footer>
    )
}