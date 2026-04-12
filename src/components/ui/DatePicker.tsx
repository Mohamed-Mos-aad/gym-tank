'use client'
// ** Hooks && Tools
import { useState, useRef, useEffect } from 'react';
// ** Assets
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft } from 'lucide-react';

// ** Interfaces
interface DatePickerProps {
    id: string;
    label: string;
    placeholder?: string;
    onChange?: (date: Date) => void;
}

export default function DatePicker({ id, label, placeholder = "اختر التاريخ...", onChange }: DatePickerProps) {
    // ** States
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [viewDate, setViewDate] = useState(new Date());
    const [dropUp, setDropUp] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // ** Constants
    const days = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
    const months = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];

    // ** Helpers
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const handleDateClick = (day: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        setSelectedDate(newDate);
        setIsOpen(false);
        if (onChange) onChange(newDate);
    };

    const changeMonth = (offset: number) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const toggleDropdown = () => {
        if (!isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setDropUp(spaceBelow < 400); // التقويم يحتاج مساحة أكبر قليلاً
        }
        setIsOpen(!isOpen);
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

    // ** Calendar Logic
    const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

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
                        w-full rounded-xl py-4 px-4 cursor-pointer flex items-center justify-between transition-all outline-none border-none
                        ${isOpen ? 'bg-white shadow-sm' : 'bg-neutral-100'}
                    `}
                >
                    <span className={`${!selectedDate ? 'text-neutral-400' : 'text-neutral-900'}`}>
                        {selectedDate ? selectedDate.toLocaleDateString('ar-EG') : placeholder}
                    </span>
                    
                    <CalendarIcon size={20} className="text-neutral-500" />
                </div>

                {isOpen && (
                    <div className={`
                        absolute z-50 w-[320px] bg-white rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in duration-200 border border-neutral-100
                        ${dropUp ? 'bottom-[calc(100%+8px)]' : 'mt-2 top-full'}
                    `}>
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                                <ChevronRight size={18} /> {/* عكس الاتجاه للغة العربية */}
                            </button>
                            <span className="font-bold text-neutral-800">
                                {months[viewDate.getMonth()]} {viewDate.getFullYear()}
                            </span>
                            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                                <ChevronLeft size={18} />
                            </button>
                        </div>

                        {/* Week Days */}
                        <div className="grid grid-cols-7 mb-2">
                            {days.map(day => (
                                <div key={day} className="text-center text-xs font-semibold text-neutral-400 py-1">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {emptyDays.map(empty => (
                                <div key={`empty-${empty}`} />
                            ))}
                            {calendarDays.map(day => {
                                const isSelected = selectedDate?.getDate() === day && 
                                    selectedDate?.getMonth() === viewDate.getMonth() && 
                                    selectedDate?.getFullYear() === viewDate.getFullYear();
                                return (
                                    <button
                                        key={day}
                                        onClick={() => handleDateClick(day)}
                                        className={`
                                            aspect-square flex items-center justify-center rounded-lg text-sm transition-all
                                            ${isSelected 
                                                ? 'bg-brand-600 text-white font-bold' 
                                                : 'hover:bg-neutral-100 text-neutral-700'}
                                        `}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}