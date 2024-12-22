"use client";

import { useCallback, useState } from "react";
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useCanRedo, useCanUndo, useHistory, useSelf,useMutation } from "@liveblocks/react/suspense";
import { CursorsPresence } from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { useStorage } from "@liveblocks/react";
import {nanoid} from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";

const MAX_LAYERS=100;

interface CanvasProps {
    boardId: string;
}
export const Canvas = ({boardId}:CanvasProps) => {
    const layerIds=useStorage((root)=>root.layerIds);
    const { name, picture} = useSelf((me) => me.info);
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });
    const [camera,setCamera]=useState<Camera>({x:0,y:0});
    const [lastUsedColor,setLastUsedColor]=useState<Color>({
        r:0,
        g:0,
        b:0,
    });
    const onWheel=useCallback((e:React.WheelEvent)=>{
        setCamera((camera)=>({
            x:camera.x - e.deltaX,
            y:camera.y - e.deltaY,
        }))
    },[])
    const history=useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer=useMutation( ({storage,setMyPresence},layerType:LayerType.Ellipse|LayerType.Note|LayerType.Rectangle|LayerType.Text,position:Point)=>{
        const liveLayers=storage.get('layers');
        if(liveLayers.size>=MAX_LAYERS){
            return;
        }
        const liveLayerIds=storage.get('layerIds');
        const layerId=nanoid();
        const layer=new LiveObject({
            type:layerType,
            x:position.x,
            y:position.y,
            width:100,
            height:100,
            fill:lastUsedColor,
        });

        liveLayerIds.push(layerId);
        liveLayers.set(layerId,layer);
        setMyPresence({selection:[layerId]},{addToHistory:true});
        setCanvasState({mode:CanvasMode.None});

},[lastUsedColor])

    const onPointerMove=useMutation(({setMyPresence},e:React.PointerEvent)=>{
        e.preventDefault();
        const current=pointerEventToCanvasPoint(e,camera);
        setMyPresence({cursor:current});
    },[])

    const onPointerLeave=useMutation(({setMyPresence})=>{
        setMyPresence({cursor:null});
    },[])
    
    const onPointerUp=useMutation(({},e)=>{
        const point=pointerEventToCanvasPoint(e,camera);
        if(canvasState.mode===CanvasMode.Inserting){
            if (canvasState.layertype === LayerType.Text || canvasState.layertype === LayerType.Note || canvasState.layertype === LayerType.Rectangle || canvasState.layertype === LayerType.Ellipse) {
                insertLayer(canvasState.layertype, point);
            }
        }
        else{
            setCanvasState({mode:CanvasMode.None});
        }
        history.resume();
    },[camera,canvasState,history,insertLayer]);

    return (
        <main
            className="h-full w-full relative bg-neutral-100 touch-none "
        >
            <Info boardId={boardId}/>
            <Participants/>
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                undo={history.undo}
                redo={history.redo}
                canUndo={canUndo}
                canRedo={canRedo}
            />
            <svg className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerUp={onPointerUp}  
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
            >
                <g
                    style={{transform:`translate(${camera.x}px,${camera.y}px)`}}
                >
                    {
                        layerIds && layerIds.map((layerId)=>{
                            return <LayerPreview key={layerId} id={layerId} onLayerPointerDown={()=>{}}
                            selectionColor={'#000'}
                            />
                        })
                    }
                    <CursorsPresence/>
                </g>
            </svg>
        </main>
    )
}