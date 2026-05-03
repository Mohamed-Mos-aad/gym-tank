import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding initial plans for the Egyptian market...');

    // 1. Free Trial Plan
    const freeTrial = await prisma.plan.create({
        data: {
            name: 'التجربة المجانية',
            price: 0,
            description: 'جرب النظام مجاناً لفترة محدودة وتعرف على كل الميزات.',
            features: [
                'إدارة حتى 50 عضو',
                'تسجيل الحضور والانصراف',
                'تقارير أساسية',
                'دعم فني عبر البريد'
            ],
            isPopular: false,
            maxMembers: 50,
            durationDays: 14
        }
    });

    // 2. Basic Plan (200 EGP)
    const basicPlan = await prisma.plan.create({
        data: {
            name: 'الباقة الأساسية',
            price: 200,
            description: 'مثالية للصالات الرياضية الصغيرة والمتوسطة.',
            features: [
                'إدارة حتى 200 عضو',
                'تسجيل الحضور والانصراف',
                'تقارير مالية مبسطة',
                'دعم فني واتساب'
            ],
            isPopular: true,
            maxMembers: 200,
            durationDays: 30
        }
    });

    // 3. Unlimited Plan
    const unlimitedPlan = await prisma.plan.create({
        data: {
            name: 'الباقة المفتوحة',
            price: 500,
            description: 'أفضل قيمة للصالات الرياضية الكبيرة والمتعددة الفروع.',
            features: [
                'عدد غير محدود من الأعضاء',
                'تقارير مالية وإحصائية شاملة',
                'إدارة فروع متعددة قريباً',
                'دعم فني على مدار الساعة',
                'تخصيص كامل للنظام'
            ],
            isPopular: false,
            maxMembers: null, // Unlimited
            durationDays: 30
        }
    });

    console.log('Plans created successfully:', {
        freeTrial: freeTrial.name,
        basicPlan: basicPlan.name,
        unlimitedPlan: unlimitedPlan.name
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
