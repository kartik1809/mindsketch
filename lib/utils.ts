import { Camera } from "@/types/canvas"
import { clsx, type ClassValue } from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"


const COLORS=['#DC2626','#D97786','#D6BCD5','#A3BFFA','#6CB2EB','#93C5FD','#22D3EE']

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function connectionIdToColor(connectionId:number):string {
  return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(
  e:React.PointerEvent,
  camera:Camera
){
  return {
    x:Math.round(e.clientX) -  camera.x,
    y:Math.round(e.clientY) - camera.y,
  }
}