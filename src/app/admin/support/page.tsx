import { getSupportInquiries } from "@/actions/admin/admin.actions";
import { Mail, User, Clock, MessageSquare, Tag } from "lucide-react";

export default async function SupportInquiriesPage() {
    const inquiries = await getSupportInquiries();

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date(date));
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-black text-neutral-900 mb-2">رسائل الدعم الفني</h1>
                <p className="text-sm text-neutral-700">استقبال ومتابعة استفسارات المستخدمين والزوار.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {inquiries.length > 0 ? inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-50 pb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold">
                                    {inquiry.name.substring(0, 1).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-neutral-900">{inquiry.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-neutral-500 font-bold">
                                        <Mail size={12} />
                                        {inquiry.email}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                                    inquiry.status === 'NEW' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                                }`}>
                                    {inquiry.status === 'NEW' ? 'رسالة جديدة' : 'تم الرد'}
                                </span>
                                <div className="text-[10px] text-neutral-400 font-bold flex items-center gap-1">
                                    <Clock size={12} />
                                    {formatDate(inquiry.createdAt)}
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-2 text-xs font-black text-neutral-400 mb-2">
                                <Tag size={12} />
                                الموضوع: {inquiry.subject || "بدون موضوع"}
                            </div>
                            <p className="text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                                {inquiry.message}
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <a 
                                href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`}
                                className="flex items-center gap-2 text-brand-500 font-bold text-sm hover:underline"
                            >
                                <MessageSquare size={16} />
                                الرد عبر البريد الإلكتروني
                            </a>
                        </div>
                    </div>
                )) : (
                    <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-neutral-200">
                        <MessageSquare className="mx-auto text-neutral-200 mb-4" size={48} />
                        <h2 className="text-xl font-black text-neutral-900 mb-2">صندوق الوارد فارغ</h2>
                        <p className="text-sm text-neutral-500">لا توجد رسائل دعم فني حالياً.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
