// ** Components
import Button from "@/components/ui/Button";
// ** Assets
import contactUsImage from '@/assets/images/contactUs.png'



export default function ContactUs() {
    return (
        <section 
            className="flex flex-col items-center gap-8 px-12 py-26 bg-black/80 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${contactUsImage.src})` }}
        >
                <h1 className="text-[60px] font-black text-[#F8F9FB]">
                    هل أنت مستعد لنقل جيمك
                    إلى المستوى التالي؟
                </h1>
                <p className="text-[20px] text-[#F8F9FB]">
                    انضم إلى مئات ملاك الجيمات الذين يثقون في GymTank لإدارة أعمالهم
                    يومياً.
                </p>
                <div className="flex gap-4">
                    <Button variant="primary">ابدأ الآن مجاناً</Button>
                    <Button variant="primary" className="bg-white/40">تواصل مع المبيعات</Button>
                </div>
        </section>
    )
}