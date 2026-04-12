'use client'
// ** Components
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/popUp/Modal";
import DatePicker from "@/components/ui/DatePicker";
// ** Assets
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus } from "lucide-react";
// ** Hooks && Tools
import { useEffect, useState } from "react";
// ** Actions
import { getMembersListAction } from "../../../actions/user.actions";
// ** Interfaces
import { MemberLite } from "@/types";


export default function Subscribes() {
    // ** States
    const [ membersData, setMembersData ] = useState<MemberLite[]>([]);
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);



    // ** Handlers
    const modalStateToggleHandler = () =>{
        setModalOpen(prev => !prev)
    }



    // ** UseEffect
    useEffect(() => {
    const fetchData = async () => {
        const res = await getMembersListAction()
        setMembersData(res.data)
    }

        fetchData()
    }, [])


    return (
        <main className="flex flex-col gap-6 lg:gap-8">
            {
                modalOpen &&
                <Modal>
                    <h1 className="text-[24px] font-bold text-[#191C1E]">
                        إضافة اشتراك جديد
                    </h1>
                    <Select label="اختيار العضو" id="memberName" placeholder="ابحث عن اسم العضو أو رقم الهاتف..." options={[]}/>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[16px] font-bold text-neutral-700">نوع الاشتراك</h2>
                        <div className="flex gap-1 bg-[#F2F4F6] p-1.5 rounded-xl">
                            <h3 className="w-full bg-white text-center rounded-lg text-[16px] font-black text-brand-500 py-2.5 cursor-pointer">شهري</h3>
                            <h3 className="w-full text-center rounded-lg text-[16px] text-neutral-700 py-2.5 cursor-pointer">3 شهور</h3>
                            <h3 className="w-full text-center rounded-lg text-[16px] text-neutral-700 py-2.5 cursor-pointer">مخصص</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <DatePicker label="تاريخ البدء" id="startDate"/>
                        <DatePicker label="تاريخ الانتهاء" id="endDate"/>
                    </div>
                    <div className="bg-[#3525CD]/5 border border-[#3525CD]/10 rounded-xl p-6">
                        <h2 className="w-full flex justify-between items-center text-[16px] font-bold text-neutral-700">
                            المبلغ الإجمالي
                            <span className="text-[30px] text-brand-500">
                                450 <span className="text-[14px]"> ر.س</span>
                            </span>
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="primary" className="w-full py-4">حفظ الاشتراك</Button>
                        <Button variant="guest" className="w-full py-4" onClick={modalStateToggleHandler}>إلغاء</Button>
                    </div>
                </Modal>
            }
            <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-[32px] font-black text-neutral-900 sm:text-[40px]">
                        الاشتراكات
                    </h1>
                    <p className="text-[14px] text-neutral-700">
                        نظرة عامة على اشتراكات الأعضاء الحالية والسابقة.
                    </p>
                </div>
                <Button
                    variant="primary"
                    className="flex w-full items-center justify-center gap-2 sm:w-fit"
                    onClick={modalStateToggleHandler}
                    >
                        <Plus className="text-white" size={20} strokeWidth={3} />
                        إضافة اشتراك جديد
                </Button>
            </section>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                    <h2 className="text-[16px] font-bold text-neutral-700">
                        إجمالي المشتركين
                    </h2>
                    <h3 className="text-[36px] font-black text-brand-500">
                        {membersData.length}
                        <span className="text-[12px] font-bold text-info-600"> 12%+ </span>
                    </h3>
                </div>
                <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                    <h2 className="text-[16px] font-bold text-neutral-700">
                        الاشتراكات النشطة
                    </h2>
                    <h3 className="text-[36px] font-black text-neutral-900">942</h3>
                </div>
                <div className="flex flex-col gap-1 rounded-3xl bg-white p-6 text-right shadow sm:p-8">
                    <h2 className="text-[16px] font-bold text-neutral-700">
                        تجديدات قريبة
                    </h2>
                    <h3 className="text-[36px] font-black text-[#7E3000]">
                        342
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
            <section className="overflow-hidden rounded-2xl bg-white shadow">
                <h2 className="border-b border-neutral-200 px-4 py-5 text-[18px] font-bold text-neutral-900 sm:px-6">
                    جدول البيانات
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-190">
                        <thead>
                        <tr className="border-b border-neutral-200">
                            <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                            اسم المشترك
                            </th>
                            <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                            نوع الاشتراك
                            </th>
                            <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                            تاريخ البدء
                            </th>
                            <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                            تاريخ الانتهاء
                            </th>
                            <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                            الحالة
                            </th>
                            <th className="px-6 py-4 text-start text-[14px] font-bold text-neutral-700">
                            الإجراءات
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {membersData.map((member) => (
                            <tr
                            key={`${member.name}-${member.subscriptionType}`}
                            className="border-b border-neutral-100 last:border-b-0"
                            >
                            <td className="px-6 py-4 text-[16px] font-bold text-neutral-900">
                                {member.name}
                            </td>
                            <td className="px-6 py-4 text-[16px] font-medium text-neutral-700">
                                <Badge className="border border-info-600/20 bg-info-600/10 text-[12px] font-bold text-info-600">
                                {member.subscriptionType}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 text-[14px] text-neutral-700">
                                {member.startDate.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-[14px] text-neutral-700">
                                {member.endDate?.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-[16px] font-bold text-neutral-900">
                                <Badge className="border border-info-600/20 bg-info-600/10 text-[12px] font-bold text-info-600">
                                {member.subscriptionStatus}
                                </Badge>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                <MoreHorizontal size={20} />
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex w-full justify-center border-t border-neutral-200 px-4 py-4 sm:justify-between sm:px-6">
                    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="text-center text-[14px] font-medium text-neutral-700">
                        عرض 1 إلى 10 من أصل 1,284 عضواً
                        </h4>

                        <div className="flex justify-center items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition-colors hover:border-brand-500 hover:text-brand-500"
                            aria-label="الصفحة السابقة"
                        >
                            <ChevronRight size={16} />
                        </button>
                        <button
                            type="button"
                            className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-brand-500 px-3 text-[14px] font-bold text-white"
                        >
                            1
                        </button>
                        <button
                            type="button"
                            className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-neutral-200 px-3 text-[14px] font-bold text-neutral-700 transition-colors hover:border-brand-500 hover:text-brand-500"
                        >
                            2
                        </button>
                        <button
                            type="button"
                            className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-neutral-200 px-3 text-[14px] font-bold text-neutral-700 transition-colors hover:border-brand-500 hover:text-brand-500"
                        >
                            3
                        </button>
                        <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition-colors hover:border-brand-500 hover:text-brand-500"
                            aria-label="الصفحة التالية"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="flex flex-col items-start gap-6 rounded-2xl bg-linear-to-br from-brand-500 from-25% to-brand-700 p-6 sm:p-8 lg:col-span-2">
                    <h2 className="text-[24px] font-bold text-white">
                        تحسين تجربة الأعضاء
                    </h2>
                    <p className="text-[14px] text-[#E0E7FF]">
                        هل لاحظت تراجعاً في التجديدات؟ استخدم نظام التذكير التلقائي لزيادة
                        معدل الاستبقاء بنسبة تصل إلى 25%.
                    </p>
                    <Button variant="guest">تفعيل التنبيهات</Button>
                </div>
                <div className="flex flex-col gap-6 rounded-3xl bg-[#E6E8EA]/50 p-6 text-right shadow sm:p-8">
                    <h2 className="text-[18px] font-bold text-[#191C1E]">
                        توزيع الباقات
                    </h2>
                    <ul className="flex flex-col gap-4">
                        <li>
                        <h3 className="w-full flex justify-between items-center text-[12px] font-bold text-[#191C1E]">
                            البلاتينية
                            <span>42%</span>
                        </h3>
                        <div className="w-full h-2 bg-[#E0E3E5] rounded-full overflow-hidden relative">
                            <span className="w-[42%] h-2 bg-[#3525CD] absolute top-0 right-0"></span>
                        </div>
                        </li>
                        <li>
                        <h3 className="w-full flex justify-between items-center text-[12px] font-bold text-[#191C1E]">
                            البريميوم
                            <span>35%</span>
                        </h3>
                        <div className="w-full h-2 bg-[#E0E3E5] rounded-full overflow-hidden relative">
                            <span className="w-[35%] h-2 bg-[#0058BE] absolute top-0 right-0"></span>
                        </div>
                        </li>
                        <li>
                        <h3 className="w-full flex justify-between items-center text-[12px] font-bold text-[#191C1E]">
                            الأساسية
                            <span>23%</span>
                        </h3>
                        <div className="w-full h-2 bg-[#E0E3E5] rounded-full overflow-hidden relative">
                            <span className="w-[23%] h-2 bg-neutral-700 absolute top-0 right-0"></span>
                        </div>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
}