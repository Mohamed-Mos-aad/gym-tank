// ** Hooks && Tools
import Image from 'next/image';
// ** Components
import Button from './../../../components/ui/Button';
// ** Assets
import { Zap } from 'lucide-react';
import gymTankDashboardPreview from '@/assets/images/GymTankDashboardPreview.png'



export default function HeroSection() {
    return (
        <section id="home" className="scroll-mt-24 px-4 pt-8 pb-16 sm:px-6 lg:px-10 lg:pt-12 lg:pb-24">
            <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:min-h-[calc(100vh-90px)] lg:grid-cols-2">
                <div className='flex flex-col gap-6 text-center lg:text-right'>
                    <span className="mx-auto flex w-fit items-center gap-2 rounded-full bg-brand-50 px-4 py-1 text-[14px] font-bold text-brand-700 lg:mx-0">
                        <Zap size={12} strokeWidth={3}/>
                        إدارة ذكية لرياضتك
                    </span>
                    <h1 className='text-4xl font-black leading-tight text-neutral-900 sm:text-5xl lg:text-6xl xl:text-7xl'>
                        ادير جيمك <br />
                        <span className='text-brand-500'>بكل سهولة</span>
                    </h1>
                    <p className='text-[16px] leading-8 text-neutral-700 sm:text-[18px] lg:text-[20px]'>
                        GymTank – السيستم المتكامل لإدارة الجيمات المصمم خصيصاً
                        للمالكين والمدربين الطموحين. تتبع المشتركين، الإيرادات،
                        والنمو في منصة واحدة.
                    </p>
                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start'>
                        <Button variant='primary' className='w-full px-8 py-3 sm:w-fit sm:px-10 sm:py-4'>ابدأ تجربتك المجانية</Button>
                        <Button variant='guest' className='w-full px-8 py-3 sm:w-fit sm:px-10 sm:py-4'>مشاهدة عرض توضيحي</Button>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='w-[95%] border-8 border-white rounded-3xl drop-shadow-lg rotate-2 overflow-hidden'>
                        <img 
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop" 
                            alt='GymTank Dashboard Preview' 
                            className='w-full h-full object-cover'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
