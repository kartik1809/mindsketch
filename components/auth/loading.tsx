import Image from "next/image"


export const Loading=()=>{
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image src="/logo.png" width={100} height={100} alt="loading" className="animate-pulse duration-700" />
        </div>
    )
}