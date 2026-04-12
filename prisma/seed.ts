import { PrismaClient, Role, SubscriptionType, SubscriptionStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // 1. إنشاء مستخدم (Owner)
    const owner = await prisma.user.upsert({
        where: { email: 'admin@gymtank.com' },
        update: {},
        create: {
            email: 'admin@gymtank.com',
            name: 'كابتن محمد',
            password: 'hashed_password_here', // تأكد من تشفيرها في الحقيقة
            role: Role.GYM_OWNER,
        },
    });

    // 2. إنشاء جيم (Gym) مرتبط بالمستخدم
    const gym = await prisma.gym.create({
        data: {
            name: 'جيم تانك فرع القاهرة',
            specialty: 'كمال أجسام ولياقة بدنية',
            phone: '0123456789',
            systemLanguage: 'ar',
            ownerId: owner.id,
        },
    });

    // 3. إضافة عضو (Member) للجيم
    await prisma.member.create({
        data: {
            name: 'أحمد علي',
            phone: '0100000000',
            subscriptionType: SubscriptionType.MONTHLY,
            subscriptionStatus: SubscriptionStatus.ACTIVE,
            gymId: gym.id,
            startDate: new Date(),
        },
    });

    console.log('Seeding finished successfully!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });