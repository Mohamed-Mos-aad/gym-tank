interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "outline" | "guest";
    children: React.ReactNode;
    className?: string;
}



export default function Button({variant ,className, children, ...props}: ButtonProps) {
    const typeStyle = {
        primary : "bg-primary text-white",
        outline: "",
        guest: "bg-white text-primary"
    }



    return (
        <button className={`${typeStyle[variant]} ${className} text-[16px] font-black rounded-xl px-6 py-2 shadow cursor-pointer`} {...props}>{children}</button>
    )
}