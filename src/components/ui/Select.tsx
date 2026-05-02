"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
    label: string;
    value: any;
}

interface SelectProps {
    options: Option[];
    value: any;
    onChange: (value: any) => void;
    label?: string;
    icon?: React.ReactNode;
    id?: string;
    placeholder?: string;
}

export default function CustomSelect({ options, value, onChange, label, icon, id, placeholder }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col gap-2 w-full" ref={containerRef}>
            {label && <label className="text-sm font-bold text-neutral-700">{label}</label>}
            <div className="relative">
                <button
                    type="button"
                    id={id}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full h-14 bg-neutral-50 border ${isOpen ? 'border-brand-500 ring-4 ring-brand-500/5' : 'border-neutral-100'} rounded-2xl px-5 flex items-center justify-between transition-all outline-none`}
                >
                    <div className="flex items-center gap-3">
                        {icon && <span className="text-neutral-400">{icon}</span>}
                        <span className={`text-sm font-bold ${selectedOption ? 'text-neutral-900' : 'text-neutral-400'}`}>
                            {selectedOption?.label || placeholder || "اختر..."}
                        </span>
                    </div>
                    <ChevronDown size={18} className={`text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <ul className="max-h-60 overflow-y-auto py-2">
                            {options.map((option) => (
                                <li 
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`px-5 py-3 text-sm font-bold cursor-pointer transition-colors ${value === option.value ? 'bg-brand-50 text-brand-700' : 'text-neutral-700 hover:bg-neutral-50'}`}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}