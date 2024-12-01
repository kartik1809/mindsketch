import { Skeleton } from "@/components/ui/skeleton"

export const Participants = () => {
    return (
        <div className="absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md ">
            TODO : Participants
        </div>
    )
}

Participants.Skeleton=function ParticipantsSkeleton(){
    return (
        <div className="absolute w-[300px] top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md ">
            <Skeleton className="h-full w-full bg-muted-400"/>
        </div>
    )
}