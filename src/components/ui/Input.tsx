'use client'
// ** Hooks && Tools
import { InputHTMLAttributes, useState } from 'react';
// ** Assets
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
// ** Interfaces
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    type: "email" | "text" | "password";
}



export default function Input({id, label, type, ...props}:InputProps) {
    // ** States
    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);


    // ** Handlers
    const passwordStateToggleHandler = ()=>{
        setPasswordHidden(prev => !prev);
    }



    return (
        <div className="flex flex-col gap-2 relative">
            {
                type !== 'text' && 
                <div className="absolute right-4 top-[50%] translate-y-1.25">
                    {type === 'email' ? (
                        <Mail size={20} />
                    ) : (
                        <LockKeyhole size={20} />
                    )}
                </div>
            }
            <label htmlFor={id}>{label}</label>
            {
                type === 'password' &&
                <div className="absolute left-4 top-[50%] translate-y-1.25 cursor-pointer" onClick={passwordStateToggleHandler}>
                    {
                        passwordHidden ? 
                        <Eye />
                        :
                        <EyeOff />
                    }
                </div>
            }
            <input type={type !== 'password' ? type : passwordHidden ? type : 'text'} name={id} id={id} className={`w-full rounded-xl bg-neutral-100 py-4 ${type !== 'text' && 'pr-12'} pl-4`} {...props}/>
        </div>
    )
}