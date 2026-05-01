"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export type ToastType = "success" | "error";

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-8 left-8 z-[100] animate-in slide-in-from-left-10 duration-300">
            <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border ${
                type === "success" 
                ? "bg-white border-emerald-100 text-emerald-900" 
                : "bg-white border-red-100 text-red-900"
            }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    type === "success" ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
                }`}>
                    {type === "success" ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                </div>
                
                <div className="flex flex-col">
                    <span className="text-sm font-black tracking-tight">{message}</span>
                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">نظام تانك</span>
                </div>

                <button onClick={onClose} className="p-1 hover:bg-neutral-50 rounded-lg transition-colors text-neutral-300">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
