export default function Sessions() {
    return (
        <div className="relative flex flex-col items-center gap-4 rounded-3xl bg-neutral-100 p-6 text-right shadow sm:p-8">
            <h2 className="w-full text-start text-[16px] font-bold text-brand-700">حضور الحصص</h2>
            <ul className="flex h-full w-full flex-col gap-4 rounded-xl">
                <li className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-brand-700"></div>
                        <div>
                            <h3 className="text-[14px] font-bold text-neutral-900">يوغا الصباح</h3>
                            <span className="text-[10px] text-neutral-700">المدرب: أحمد</span>
                        </div>
                    </div>
                    <div className="self-start text-left sm:self-auto">
                        <h4 className="text-[14px] font-black text-brand-700">18/20</h4>
                        <span className="text-[10px] text-neutral-700">مكتمل تقريبًا</span>
                    </div>
                </li>

                <li className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-brand-700"></div>
                        <div>
                            <h3 className="text-[14px] font-bold text-neutral-900">تمارين القوة (HIIT)</h3>
                            <span className="text-[10px] text-neutral-700">المدربة: سارة</span>
                        </div>
                    </div>
                    <div className="self-start text-left sm:self-auto">
                        <h4 className="text-[14px] font-black text-brand-700">12/25</h4>
                        <span className="text-[10px] text-neutral-700">متاح</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}