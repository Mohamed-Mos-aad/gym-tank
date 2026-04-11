// ** Components
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";



export default function Login() {
    return (
        <main className="mx-auto grid min-h-screen w-full max-w-6xl overflow-hidden bg-white lg:min-h-[85vh] lg:grid-cols-2 lg:rounded-2xl lg:shadow-2xl">
            <div className="flex flex-col justify-end gap-3 bg-linear-to-r from-brand-500 to-indigo-600 p-6 sm:p-8 lg:min-h-0 lg:gap-4 lg:p-12">
                <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[48px]">
                    إدارة
                    الجيم الذكية
                </h1>
                <p className="text-[15px] font-light text-indigo-100 sm:text-[16px] lg:text-[18px]">
                    تحكم في كل تفاصيل ناديك الرياضي من لوحة قيادة
                    واحدة متطورة ومصممة بدقة عالية.
                </p>
            </div>
            <div className="flex flex-col justify-center gap-2 p-6 sm:p-8 lg:p-12">
                <h2 className="text-[22px] font-black text-brand-500 sm:text-[24px]">جيم تانك</h2>
                <h3 className="text-[28px] font-bold text-neutral-900 sm:text-[30px]">تسجيل الدخول</h3>
                <p className="text-[15px] font-medium text-neutral-700 sm:text-[16px]">مرحباً بك مجدداً في نظام الإدارة الخاص بك</p>
                <form className="mt-4 flex flex-col gap-5 sm:gap-6">
                    <Input id="email" label="البريد الإلكتروني" type="email" placeholder="name@gymtank.com"/>
                    <Input id="password" label="كلمة المرور" type="password" placeholder="************"/>
                    <Button variant="primary" className="mt-2 w-full py-4">تسجيل الدخول</Button>
                </form>
                <span className="mx-auto my-8 h-px w-full max-w-105 bg-neutral-200"></span>
                <h4 className="text-center text-[15px] text-neutral-700 sm:text-[16px]">
                    ليس لديك حساب؟
                    <span className="text-[16px] font-bold text-brand-500"> اتصل بنا للتفعيل</span>
                </h4>
            </div>
        </main>
    );
}