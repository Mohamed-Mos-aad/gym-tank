// ** Interfaces
interface Modalprops{
    children: React.ReactNode;
}


export default function Modal({children}:Modalprops) {
    return (
        <div className="w-full h-screen overflow-y-auto flex justify-center items-start sm:items-center bg-[#191C1E]/40 backdrop-blur-xs fixed z-50 top-0 left-0 px-4 py-6">
            <div className="w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 flex flex-col gap-6 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                {children}
            </div>
        </div>
    )
}