"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color } from "@/types/canvas";
import { useSelf } from "@liveblocks/react";
import { memo } from "react";

interface SelectionToolsProps {
    camera:Camera;
    setLastUsedColor:(color:Color)=>void;
}

export const SelectionTools = memo(({camera,setLastUsedColor}:SelectionToolsProps) => {
    const selection=useSelf((me)=>me.presence.selection);
    const selectionBounds=useSelectionBounds();
    console.log("0x76");
    if(!selectionBounds){
        return null;
    }
    const x=selectionBounds.width/2+selectionBounds.x+camera.x;
    const y=selectionBounds.y+camera.y;
    return (
        <div
            className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
            style={{transform:`translate(calc(${x}px-50%),calc(${y-16}px-100%))`}}
        >
            
        </div>
    );
});

SelectionTools.displayName="SelectionTools";