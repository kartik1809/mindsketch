"use client";

import { memo } from "react";
import { shallow } from "@liveblocks/react";
import { useOthersConnectionIds, useOthersMapped } from "@liveblocks/react";
import { Cursor } from "./cursor";
import { Path } from "./path";
import { ColorToCSS } from "@/lib/utils";

const Cursors=()=>{
    const ids=useOthersConnectionIds();
    return (
        <>
            {ids.map((connectionId)=>{
                return (
                    <Cursor
                        key={connectionId}
                        connectionId={connectionId} 
                    />
                )
            })}
        </>
    )
}

const Drafts=()=>{
    const others=useOthersMapped((other)=>(
        {
            pencilDraft:other.presence.pencilDraft,
            penColor:other.presence.penColor,
        }
    ),shallow);
    return(
        <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? ColorToCSS(other.penColor) : "#000"}
            />
          );
        }
        return null;
      })}
    </>
    )
};

export const CursorsPresence = memo(() => {
    return (
       <>
            <Drafts/>
            <Cursors/>
       </>
    )
});

CursorsPresence.displayName = "CursorsPresence";