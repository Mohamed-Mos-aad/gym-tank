import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "outline" | "guest";
    children: React.ReactNode;
    className?: string;
}



export default function Button({variant ,className, children, ...props}: ButtonProps) {
    const typeStyle = {
        primary : "bg-brand-500 text-white hover:bg-brand-500/90",
        outline: "bg-transparent text-brand-500 border border-brand-500 hover:bg-brand-500/10",
        guest: "bg-white text-brand-500 hover:bg-neutral-100"
    }



    return (
        <button
            className={twMerge(
                "text-[16px] font-black rounded-xl px-6 py-2 shadow cursor-pointer transition-colors duration-200",
                typeStyle[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
