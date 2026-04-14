"use client";
// ** Hooks && Tools
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// ** Components
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
// ** Actions
import { createUserAction } from "@/actions/user.actions";

export default function SignUp() {
  // ** Hooks && Tools
  const router = useRouter();

  // ** State
  const [formData, setFormData] = useState({
    gymName: "",
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ** Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createUserHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserAction(formData);
      router.push("/login");
    } catch (error) {
      console.error("حدث خطأ أثناء التسجيل:", error);
    }
  };

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-6xl overflow-hidden bg-white lg:min-h-[85vh] lg:grid-cols-2 lg:rounded-2xl lg:shadow-2xl">
      <div className="flex flex-col justify-end gap-3 bg-linear-to-r from-brand-500 to-indigo-600 p-6 sm:p-8 lg:min-h-0 lg:gap-4 lg:p-12">
        <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[48px]">
          حوّل رؤيتك الرياضية إلى واقع ملموس
        </h1>
        <p className="text-[15px] font-light text-indigo-100 sm:text-[16px] lg:text-[18px]">
          انضم إلى آلاف مديري الصالات الرياضية الذين يستخدمون GymTank لتبسيط
          عملياتهم وزيادة نمو أعمالهم.
        </p>
        <div className="w-full flex flex-col gap-4 bg-white/10 p-6 rounded-xl">
          <div className="flex items-center">
            <div className="flex">
              <div className="w-10 h-10 bg-brand-500 rounded-full border-2 border-white"></div>
              <div className="w-10 h-10 bg-brand-500 rounded-full border-2 border-white relative translate-x-3"></div>
              <div className="w-10 h-10 bg-brand-500 rounded-full border-2 border-white relative translate-x-6"></div>
            </div>
            <h2 className="text-[14px] font-medium text-white">
              +500 مشترك جديد اليوم
            </h2>
          </div>
          <div className="w-full h-1.5 flex justify-start bg-white/20 rounded-full">
            <span className="w-[68%] h-1.5 bg-white rounded-full"></span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-2 p-6 sm:p-8 lg:max-p-12">
        <h2 className="text-[28px] font-bold text-neutral-900 sm:text-[30px]">
          ابدأ رحلتك معنا
        </h2>
        <p className="text-[15px] font-medium text-neutral-700 sm:text-[16px]">
          أدخل تفاصيل ناديك الرياضي لإنشاء حسابك الإداري
        </p>

        <form
          onSubmit={createUserHandler}
          className="mt-4 flex flex-col gap-5 sm:gap-6"
        >
          <div className="grid grid-cols-2 gap-5">
            <Input
              id="gymName"
              name="gymName"
              label="اسم النادي"
              type="text"
              placeholder="مثلاً: نادي القوة"
              value={formData.gymName}
              onChange={handleChange}
            />
            <Input
              id="ownerName"
              name="ownerName"
              label="اسم المالك"
              type="text"
              placeholder="الاسم الكامل"
              value={formData.ownerName}
              onChange={handleChange}
            />
          </div>
          <Input
            id="email"
            name="email"
            label="البريد الإلكتروني"
            type="email"
            placeholder="name@gymtank.com"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-5">
            <Input
              id="password"
              name="password"
              label="كلمة المرور"
              type="password"
              placeholder="**********"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              label="تأكيد كلمة المرور"
              type="password"
              placeholder="**********"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="terms" id="terms" required />
            <label htmlFor="terms" className="text-[14px] text-neutral-700">
              أوافق على
              <Link href={""} className="font-bold text-brand-500">
                {" "}
                شروط الخدمة{" "}
              </Link>
              و
              <Link href={""} className="font-bold text-brand-500">
                {" "}
                سياسة الخصوصية{" "}
              </Link>
              الخاصة بـ GymTank.
            </label>
          </div>

          <Button type="submit" variant="primary" className="mt-2 w-full py-4">
            إنشاء حساب
          </Button>
        </form>

        <span className="mx-auto my-8 h-px w-full max-w-105 bg-neutral-200"></span>
        <h4 className="text-center text-[15px] text-neutral-700 sm:text-[16px]">
          لديك حساب بالفعل؟
          <Link
            href={"/login"}
            className="text-[16px] font-bold text-brand-500"
          >
            {" "}
            تسجيل دخول
          </Link>
        </h4>
      </div>
    </main>
  );
}
