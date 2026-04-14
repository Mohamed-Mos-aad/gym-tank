// ** Interfaces
interface CardsProps{ 
    members: number;
    active: number;
    expired: number;
    presentNow: number;
} 



export default function Cards({members, active, expired, presentNow}: CardsProps) {
    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                <h2 className="text-[16px] font-bold text-neutral-700">إجمالي الأعضاء</h2>
                <h3 className="text-[30px] font-black text-neutral-900">
                    {members}
                    <span className="text-[12px] font-bold text-info-600"> 12%+ </span>
                </h3>
            </div>
            <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                <h2 className="text-[16px] font-bold text-neutral-700">اشتراكات نشطة</h2>
                <h3 className="text-[30px] font-black text-neutral-900">
                    {active}
                    <span className="text-[12px] font-bold text-info-600"> عضو </span>
                </h3>
            </div>
            <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                <h2 className="text-[16px] font-bold text-neutral-700">منتهية الصلاحية</h2>
                <h3 className="text-[30px] font-black text-neutral-900">
                    {expired}
                    <span className="text-[12px] font-bold text-info-600"> متابعة </span>
                </h3>
            </div>
            <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                <h2 className="text-[16px] font-bold text-neutral-700">الآن في الجيم</h2>
                <h3 className="text-[30px] font-black text-neutral-900">{presentNow}</h3>
            </div>
        </section>
    )
}