'use client'
// ** Hooks && Tools
import { useState, useRef, useEffect } from 'react';
// ** Assets
import { ChevronDown, ListFilter, Check } from 'lucide-react';

// ** Interfaces
interface Option {
    label: string;
    value: string | number;
}

interface SelectProps {
    id: string;
    label: string;
    options: Option[];
    placeholder?: string;
    icon?: boolean;
    onChange?: (value: string | number) => void;
}

export default function Select({ id, label, options, icon = false, placeholder = "اختر...", onChange }: SelectProps) {
    // ** States
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Option | null>(null);
    const [dropUp, setDropUp] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // ** Handlers
    const toggleDropdown = () => {
        if (!isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setDropUp(spaceBelow < 260);
        }
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: Option) => {
        setSelectedValue(option);
        setIsOpen(false);
        if (onChange) onChange(option.value);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col gap-2 relative" ref={containerRef}>
            <label className="text-base font-medium text-neutral-800">
                {label}
            </label>

            <div className="relative">
                <div
                    id={id}
                    onClick={toggleDropdown}
                    className={`
                        w-full rounded-xl py-4 cursor-pointer flex items-center justify-between transition-all outline-none border-none
                        ${icon ? 'pr-12' : 'pr-4'} pl-4 
                        ${isOpen ? 'bg-white shadow-sm' : 'bg-neutral-100'}
                    `}
                >
                    {icon && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                            <ListFilter size={20} />
                        </div>
                    )}

                    <span className={`${!selectedValue ? 'text-neutral-400' : 'text-neutral-900'}`}>
                        {selectedValue ? selectedValue.label : placeholder}
                    </span>

                    <ChevronDown 
                        size={20} 
                        className={`text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                </div>
                {isOpen && (
                    <ul className={`
                        absolute z-50 w-full bg-white rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 border-none outline-none
                        ${dropUp ? 'bottom-[calc(100%+8px)]' : 'mt-2 top-full'}
                    `}>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`
                                    px-4 py-3 flex items-center justify-between cursor-pointer transition-colors
                                    ${selectedValue?.value === option.value ? 'bg-brand-50 text-brand-600' : 'hover:bg-neutral-50 text-neutral-700'}
                                `}
                            >
                                <span>{option.label}</span>
                                {selectedValue?.value === option.value && <Check size={16} />}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}