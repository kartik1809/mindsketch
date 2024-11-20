import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

export const EmptyBoards = () => {
    // const createBoard = useMutation(api.board.create);
    const {mutate,pending}=useApiMutation(api.board.create);
    const {organization}=useOrganization();
    const handleCreateBoard = async () => {
        if(!organization){
            return;
        }
        mutate({
            orgId:organization.id,
            title: "Untitled Board",
        })
        .then((id)=>{
            toast.success("Board created successfully");
        })
        .catch((error)=>{
            toast.error("Failed to create board");
        })
    };
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Image
                src="/emptyboard.svg"
                width={400}
                height={400}
                alt="No boards"
            />
            <span className="text-md font-semibold text-muted-foreground mt-2">
                Welcome to MindSketch
            </span>
            <span className="text-2xl font-semibold ">No boards found , try creating one!!</span>
            
            <div className="mt-6">
                    <Button disabled={pending} onClick={handleCreateBoard}>Create Board</Button>
            </div>
        </div>
    )
}