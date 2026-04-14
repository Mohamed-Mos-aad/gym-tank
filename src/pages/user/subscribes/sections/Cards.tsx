// ** Interfaces
interface CardsProps{
    members: number;
    active: number;
    expiringSoon: number;
}



export default function Cards({members, active , expiringSoon}:CardsProps) {
    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                <h2 className="text-[16px] font-bold text-neutral-700">
                    إجمالي المشتركين
                </h2>
                <h3 className="text-[36px] font-black text-brand-500">
                    {members}
                    <span className="text-[12px] font-bold text-info-600"> 12%+ </span>
                </h3>
            </div>
            <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                <h2 className="text-[16px] font-bold text-neutral-700">
                    الاشتراكات النشطة
                </h2>
                <h3 className="text-[36px] font-black text-neutral-900">{active}</h3>
            </div>
            <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                <h2 className="text-[16px] font-bold text-neutral-700">
                    تجديدات قريبة
                </h2>
                <h3 className="text-[36px] font-black text-[#7E3000]">
                    {expiringSoon}
                    <span className="text-[12px] font-bold text-neutral-700">
                    {" "}
                    خلال 7 أيام{" "}
                    </span>
                </h3>
            </div>
            <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                <h2 className="text-[16px] font-bold text-neutral-700">
                    الإيرادات الشهرية
                </h2>
                <h3 className="text-[36px] font-black text-neutral-900">
                    42
                    <span className="text-[12px] font-bold text-neutral-700">
                    {" "}
                    ر.س{" "}
                    </span>
                </h3>
            </div>
        </section>
    )
}