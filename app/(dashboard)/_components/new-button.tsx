"use client";

import { Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Hint } from "./hint";


export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="aspect-square">
                    <Hint
                        label="Create organization"
                        side="right"
                        align="center"
                        sideOffset={16}
                    >
                        <button className="h-full w-full rounded-md flex items-center justify-center bg-white/25 opacity-60 hover:opacity-100 transition">
                            <Plus className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent w-fit border-none">
                <CreateOrganization routing="hash" />
            </DialogContent>
        </Dialog>
    )
}