// ** Hooks && Tools
import Image from 'next/image';
// ** Components
import Button from './../../../components/ui/Button';
// ** Assets
import { Zap } from 'lucide-react';
import gymTankDashboardPreview from '@/assets/images/GymTankDashboardPreview.png'



export default function HeroSection() {
    return (
        <section className="min-h-screen grid grid-cols-2 items-center px-24">
            <div className='flex flex-col gap-8'>
                <span className="w-fit flex items-center gap-2 bg-[#D8E2FF] px-4 py-1 rounded-full text-[14px] font-bold text-[#001A42]">
                    <Zap size={12} strokeWidth={3}/>
                    إدارة ذكية لرياضتك
                </span> 
                <h1 className='text-[72px] font-black text-[#191C1E]'>
                    ادير جيمك <br />
                    <span className='text-primary'>بكل سهولة</span>
                </h1>
                <p className='text-[20px] text-[#191C1E] leading-8'>
                    GymTank – السيستم المتكامل لإدارة الجيمات المصمم خصيصاً
                    للمالكين والمدربين الطموحين. تتبع المشتركين، الإيرادات،
                    والنمو في منصة واحدة.
                </p>
                <div className='flex gap-4'>
                    <Button variant='primary'>ابدأ تجربتك المجانية</Button>
                    <Button variant='guest'>مشاهدة عرض توضيحي</Button>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-[95%] border-8 border-white rounded-3xl drop-shadow-lg rotate-2 overflow-hidden'>
                    <Image src={gymTankDashboardPreview} alt='GymTank Dashboard Preview' className='scale-150'/>
                </div>
            </div>
        </section>
    )
}