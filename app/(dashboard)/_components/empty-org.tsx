import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";

export const EmptyOrg = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Image
                src="/elements.png"
                width={400}
                height={400}
                alt="No organization"
            />
            <span className="text-2xl font-semibold ">Welcome to Mindsketch</span>
            <span className="text-sm text-muted-foreground mt-2">Create or join an organization to get started</span>
            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Create organization</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-fit">
                        <CreateOrganization routing="hash" />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
