import { Skeleton } from "@/components/ui/skeleton"

export const Toolbar = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 ">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <div className="">Pencil</div>
                <div className="">Brush</div>
                <div className="">Eraser</div>
                <div className="">Color</div>
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <div>Undo</div>
                <div>Redo</div>
            </div>
        </div>
    )
}

Toolbar.Skeleton=function ToolbarSkeleton(){
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 ">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <Skeleton className="bg-white rounded-md p-1.5 h-12 w-12 flex flex-col items-center shadow-md"/>
                <Skeleton className="bg-white rounded-md p-1.5 h-12 w-12 flex flex-col items-center shadow-md"/>
                <Skeleton className="bg-white rounded-md p-1.5 h-12 w-12 flex flex-col items-center shadow-md"/>
                <Skeleton className="bg-white rounded-md p-1.5 h-12 w-12 flex flex-col items-center shadow-md"/>
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <Skeleton className="bg-white rounded-md p-1.5 h-12 w-12 flex flex-col items-center shadow-md"/>
                <Skeleton className="bg-white rounded-md p-1.5 h-12 w-12 flex flex-col items-center shadow-md"/>
            </div>
        </div>
    )
}