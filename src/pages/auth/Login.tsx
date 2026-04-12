'use client'

// ** Hooks && Tools
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ** Components
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

// ** Actions
import { loginUserAction } from "../../../actions/user.actions";
import cookieStore from "@/utils/cookies";

export default function Login() {
    // ** Hooks
    const router = useRouter();

    // ** State
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // ** Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await loginUserAction(formData);
            cookieStore.saveToken(response?.id);
            console.log(response?.id)
            router.push("/user");
        } catch (error) {
            console.error("Login Error:", error);
        } finally {
            setIsLoading(false);
        }
    };



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
                
                <form onSubmit={loginHandler} className="mt-4 flex flex-col gap-5 sm:gap-6">
                    <Input 
                        id="email" 
                        name="email" // مهم جداً للـ handleChange
                        label="البريد الإلكتروني" 
                        type="email" 
                        placeholder="name@gymtank.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input 
                        id="password" 
                        name="password" // مهم جداً للـ handleChange
                        label="كلمة المرور" 
                        type="password" 
                        placeholder="************"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="mt-2 w-full py-4"
                        disabled={isLoading}
                    >
                        {isLoading ? "جاري التحقق..." : "تسجيل الدخول"}
                    </Button>
                </form>

                <span className="mx-auto my-8 h-px w-full max-w-105 bg-neutral-200"></span>
                <h4 className="text-center text-[15px] text-neutral-700 sm:text-[16px]">
                    ليس لديك حساب؟
                    <Link href="/register" className="text-[16px] font-bold text-brand-500"> سجل الآن </Link>
                    أو 
                    <span className="text-[16px] font-bold text-neutral-900 cursor-pointer"> اتصل بنا للتفعيل</span>
                </h4>
            </div>
        </main>
    );
}