"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit2, RefreshCw, Trash2, ChevronDown } from "lucide-react";

interface MemberActionsProps {
    member: any;
    onEdit: (member: any) => void;
    onRenew: (member: any) => void;
    onDelete: (member: any) => void;
}

export default function MemberActions({ member, onEdit, onRenew, onDelete }: MemberActionsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`cursor-pointer p-2 rounded-lg transition-all ${isOpen ? 'bg-neutral-100 text-neutral-900' : 'hover:bg-neutral-50 text-neutral-400 hover:text-neutral-600'}`}
            >
                <MoreVertical size={18} />
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-neutral-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                    <ul className="py-2">
                        <li>
                            <button 
                                onClick={() => { onEdit(member); setIsOpen(false); }}
                                className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
                            >
                                <Edit2 size={16} className="text-blue-500" />
                                تعديل البيانات
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => { onRenew(member); setIsOpen(false); }}
                                className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
                            >
                                <RefreshCw size={16} className="text-emerald-500" />
                                تجديد الاشتراك
                            </button>
                        </li>
                        <li className="border-t border-neutral-50 mt-1 pt-1">
                            <button 
                                onClick={() => { onDelete(member); setIsOpen(false); }}
                                className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={16} />
                                حذف العضو
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
