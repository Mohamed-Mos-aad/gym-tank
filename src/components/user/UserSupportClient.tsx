"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { createSupportInquiryAction } from "@/actions/user/gym.actions";

export default function UserSupportClient({ defaultUser }: { defaultUser: any }) {
    const [formData, setFormData] = useState({
        name: defaultUser?.name || "",
        email: defaultUser?.email || "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createSupportInquiryAction(formData);
            setIsSuccess(true);
            setFormData({ ...formData, subject: "", message: "" });
        } catch (error) {
            alert("حدث خطأ أثناء إرسال الرسالة");
        }
        setIsSubmitting(false);
    };

    if (isSuccess) {
        return (
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-neutral-100 flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 rounded-full bg-green-50 text-green-500 flex items-center justify-center shadow-inner">
                    <CheckCircle2 size={40} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-neutral-900 mb-2">تم استلام رسالتك بنجاح!</h2>
                    <p className="text-sm text-neutral-500 max-w-sm">سيقوم فريق الدعم بمراجعة طلبك والرد عليك عبر البريد الإلكتروني في أقرب وقت ممكن.</p>
                </div>
                <button 
                    onClick={() => setIsSuccess(false)}
                    className="bg-brand-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 transition-all"
                >
                    إرسال رسالة أخرى
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
            <h2 className="text-xl font-black text-neutral-900 mb-8 flex items-center gap-2">
                <Send size={20} className="text-brand-500" />
                أرسل لنا استفسارك
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-neutral-700">الاسم بالكامل</label>
                        <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-neutral-700">البريد الإلكتروني</label>
                        <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-neutral-700">موضوع الرسالة</label>
                    <input 
                        type="text" 
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="h-12 bg-neutral-50 border border-neutral-100 rounded-xl px-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="مثال: استفسار عن الفواتير، مشكلة في النظام..."
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-neutral-700">الرسالة</label>
                    <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="h-40 bg-neutral-50 border border-neutral-100 rounded-xl p-4 text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                        placeholder="اكتب تفاصيل استفسارك هنا..."
                    />
                </div>

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-brand-500 text-white h-14 rounded-2xl font-black shadow-lg shadow-brand-500/20 hover:bg-brand-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? "جاري الإرسال..." : (
                        <>
                            إرسال الرسالة الآن
                            <Send size={18} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
