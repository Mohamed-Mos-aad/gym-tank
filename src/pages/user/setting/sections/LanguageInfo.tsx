// ** Assets
import { Languages } from "lucide-react";
// ** Components
import Select from "@/components/ui/Select";



export default function LanguageInfo() {
    return (
        <div className="relative flex flex-col gap-4 rounded-3xl bg-white p-8 text-right shadow sm:p-8">
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 flex justify-center items-center rounded-lg bg-[#D8E2FF]">
                    <Languages className="text-[#0058BE]"/>
                </div>
                <div>
                    <h2 className="text-[20px] font-bold text-neutral-900">اللغة والمنطقة</h2>
                    <p className="text-[12px] text-neutral-700">تخصيص واجهة العرض والتوقيت المحلي.</p>
                </div>
            </div>
            <form className="grid grid-cols-2 gap-6">
                <Select id="systemLanguage" label="لغة النظام الافتراضية" options={[{label: 'text1', value: 'text1'},{label: 'text2', value: 'text2'}]}/>
                <Select id="systemTime" label="المنطقة الزمنية" options={[{label: 'text1', value: 'text1'},{label: 'text2', value: 'text2'}]}/>
            </form>
        </div>
    )
}