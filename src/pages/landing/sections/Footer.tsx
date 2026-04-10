// ** Hooks && Tools
import Link from "next/link";
// ** Assets
import { Earth, MessageSquareText, SendHorizontal, Share2 } from "lucide-react";
import Button from "@/components/ui/Button";



export default function Footer() {
    return (
        <footer className="bg-neutral-100 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
            <div className="mx-auto w-full max-w-7xl">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-[30px] font-black text-brand-500">جيم تانك</h1>
                        <p className="text-[16px] text-neutral-700">
                            المنصة الرائدة في الشرق الأوسط لإدارة
                            المنشآت الرياضية بكل ذكاء وسهولة.
                        </p>
                        <div className="flex gap-3">
                            <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 transition-colors hover:bg-brand-50"><Share2 className="w-5 text-neutral-900" /></Link>
                            <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 transition-colors hover:bg-brand-50"><MessageSquareText className="w-5 text-neutral-900" /></Link>
                            <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 transition-colors hover:bg-brand-50"><Earth className="w-5 text-neutral-900" /></Link>
                        </div>
                    </div>
                    <div className="mb-2">
                        <h2 className="mb-4 text-[18px] font-bold text-neutral-900">المنتج</h2>
                        <ul className="flex flex-col gap-4 text-[16px] text-neutral-700">
                            <li><Link href="#features" className="transition-colors hover:text-brand-500">المميزات</Link></li>
                            <li><Link href="#pricing" className="transition-colors hover:text-brand-500">الأسعار</Link></li>
                            <li><Link href="#" className="transition-colors hover:text-brand-500">التحديثات</Link></li>
                            <li><Link href="#" className="transition-colors hover:text-brand-500">المدونة</Link></li>
                        </ul>
                    </div>
                    <div className="mb-2">
                        <h2 className="mb-4 text-[18px] font-bold text-neutral-900">الشركة</h2>
                        <ul className="flex flex-col gap-4 text-[16px] text-neutral-700">
                            <li><Link href="#" className="transition-colors hover:text-brand-500">من نحن</Link></li>
                            <li><Link href="#contact" className="transition-colors hover:text-brand-500">اتصل بنا</Link></li>
                            <li><Link href="#" className="transition-colors hover:text-brand-500">الشروط والأحكام</Link></li>
                            <li><Link href="#" className="transition-colors hover:text-brand-500">سياسة الخصوصية</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-[18px] font-bold text-neutral-900">اشترك في النشرة</h2>
                        <p className="text-[16px] text-neutral-700">
                            احصل على آخر نصائح إدارة الجيمات والمنشآت
                            الرياضية.
                        </p>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full rounded-xl bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-700/70"
                                placeholder="بريدك الإلكتروني"
                            />
                            <Button variant="primary" className="w-full sm:w-fit"><SendHorizontal size={20}/></Button>
                        </div>
                    </div>
                </div>
                <h3 className="mt-12 text-center text-[14px] text-neutral-700 lg:mt-16">جميع الحقوق محفوظة. © 2026 GymTank.</h3>
            </div>
        </footer>
    )
}
