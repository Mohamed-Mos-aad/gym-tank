import React from "react"

// ** Interfaces
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}



export default function Badge({children, className, ...props}: BadgeProps) {
    return (
        <span
            className={`mx-auto flex w-fit items-center gap-2 rounded-full bg-brand-50 px-4 py-1 text-[14px] font-bold text-brand-700 lg:mx-0 ${className}`}
            {...props}
        >
            {children}
        </span>
    )
}