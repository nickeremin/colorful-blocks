import React from "react"
import clsx, { type ClassValue } from "clsx"
import { nanoid } from "nanoid"
import { twMerge } from "tailwind-merge"

import { type ColorfulBlock } from "../types/block"

export const DEFAULT_EXPIRE_TIME = 20

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateHexColor() {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)

  const redHex = red.toString(16).padStart(2, "0")
  const greenHex = green.toString(16).padStart(2, "0")
  const blueHex = blue.toString(16).padStart(2, "0")

  return "#" + redHex + greenHex + blueHex
}

export function createColorfulBlock() {
  return {
    id: nanoid(),
    color: generateHexColor(),
    time: DEFAULT_EXPIRE_TIME,
  } satisfies ColorfulBlock
}

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = React.useState<MousePosition>({
    x: 0,
    y: 0,
  })

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return mousePosition
}
