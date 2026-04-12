// ** Interfaces
interface Modalprops{
    children: React.ReactNode;
}


export default function Modal({children}:Modalprops) {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#191C1E]/40 backdrop-blur-xs fixed z-888888 top-0 left-0">
            <div className="w-1/2 flex flex-col gap-6 bg-white rounded-xl p-8">
                {children}
            </div>
        </div>
    )
}