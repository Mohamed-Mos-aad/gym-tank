// ** Hooks && Tools
import type { CSSProperties } from "react";



export default function Tracker() {
    // ** Constans
    const progressStyle = { "--progress": 68 } as CSSProperties;



    return (
        <div className="relative flex flex-col items-center gap-4 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
            <h2 className="w-full text-start text-[16px] font-bold text-brand-700">إشغال الصالة حاليًا</h2>
            <div className="progress flex h-48 w-48 items-center justify-center rounded-full text-center" style={progressStyle}>
                <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-white">
                    <h3 className="text-[36px] font-black text-brand-700">68%</h3>
                    <span className="text-[10px] font-bold text-neutral-700">معدل الإشغال</span>
                </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-neutral-100 px-6 py-3 text-center sm:px-10">
                    <h4 className="text-[12px] font-bold text-neutral-700">المتواجدون الآن</h4>
                    <span className="text-[18px] font-black text-brand-500">42</span>
                </div>
                <div className="rounded-xl bg-neutral-100 px-6 py-3 text-center sm:px-10">
                    <h4 className="text-[12px] font-bold text-neutral-700">السعة القصوى</h4>
                    <span className="text-[18px] font-black text-brand-700">65</span>
                </div>
            </div>
        </div>
    )
}