"use-client";
import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import {formatDistanceToNow} from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
}

export const BoardCard = ({ id,title,authorName,authorId,createdAt,imageUrl,orgId,isFavorite}: BoardCardProps) => {
    
    const {userId}=useAuth();
    const authorLabel=userId===authorId?"You":authorName;
    const createdAtLabel=formatDistanceToNow(createdAt,{addSuffix:true});
    const {mutate:onFavorite,pending:pendingFavorite}=useApiMutation(api.board.favorite);
    const {mutate:onUnfavorite,pending:pendingUnfavorite}=useApiMutation(api.board.unfavorite);
    const toggleFavorite=()=>{
        if(isFavorite){
            onUnfavorite({id})
                .catch(()=> toast.error("Failed to remove from favorites"));
        }else{
            onFavorite({id,orgId})
                .catch(()=> toast.error("Failed to add to favorites"));
        }
    }
    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-fit"
                    />
                    <Overlay/>
                    <Actions 
                        id={id}
                        title={title}
                        side="right"    
                    >
                        <button className="absolute top-1 right-1 group-hover:opacity-100  opacity-0 px-3 transition-opacity py-2 outline-none">
                           <MoreHorizontal
                            className="text-white hover:opacity-100  opacity-75 transition-opacity"
                           />
                        </button>
                    </Actions>
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={toggleFavorite}
                    disabled={pendingFavorite || pendingUnfavorite}
                />
            </div>
        </Link>
    );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <Skeleton className="flex-1" />
            <Skeleton className="h-16" />
        </div>
    );
};
