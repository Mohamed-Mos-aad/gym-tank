// ** Components
import Button from "@/components/ui/Button";
// ** Assets
import contactUsImage from '@/assets/images/contactUs.png'



export default function ContactUs() {
    return (
        <section
            id="contact"
            className="scroll-mt-24 bg-neutral-900/72 bg-cover bg-center bg-no-repeat bg-blend-multiply px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
            style={{ backgroundImage: `url(${contactUsImage.src})` }}
        >
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
                <h1 className="text-3xl font-black leading-tight text-neutral-50 sm:text-4xl lg:text-6xl">
                    هل أنت مستعد لنقل جيمك
                    إلى المستوى التالي؟
                </h1>
                <p className="text-[16px] text-neutral-50 sm:text-[18px] lg:text-[20px]">
                    انضم إلى مئات ملاك الجيمات الذين يثقون في GymTank لإدارة أعمالهم
                    يومياً.
                </p>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Button variant="primary" className="w-full px-12 py-4 sm:w-fit">ابدأ الآن مجاناً</Button>
                    <Button variant="primary" className="w-full px-12 py-4 bg-white/25 text-white hover:bg-white/35 sm:w-fit">تواصل مع المبيعات</Button>
                </div>
            </div>
        </section>
    )
}
