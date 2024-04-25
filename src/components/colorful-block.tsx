"use client"

import React from "react"
import { useBlockStore } from "@/store/block-store-provider"
import { motion } from "framer-motion"

import { type ColorfulBlock } from "@/shared/types/block"
import { DEFAULT_EXPIRE_TIME } from "@/shared/lib/utils"

interface ColorfulBlockProps {
  block: ColorfulBlock
}

function ColorfulBlock({ block }: ColorfulBlockProps) {
  const updateBlock = useBlockStore((state) => state.updateBlock)
  const tickBlock = useBlockStore((state) => state.tickBlock)
  const deleteBlock = useBlockStore((state) => state.deleteBlock)

  const timerRef = React.useRef<{ intervalId: NodeJS.Timeout | null }>({
    intervalId: null,
  })
  const [timetReseted, setTimerReseted] = React.useState(0)

  React.useEffect(() => {
    updateBlock({ ...block, time: DEFAULT_EXPIRE_TIME })

    const intervalId = setInterval(() => {
      tickBlock(block.id)
    }, 1000)

    timerRef.current.intervalId = intervalId

    return () => clearInterval(intervalId)
  }, [timetReseted])

  React.useEffect(() => {
    if (block.time == 0 && timerRef.current.intervalId) {
      clearInterval(timerRef.current.intervalId)
      deleteBlock(block.id)
    }
  }, [block.time])

  return (
    <motion.div
      data-button
      role="button"
      layoutId={block.id}
      initial={{ opacity: 0, scale: 0.9, borderRadius: "100%", rotate: -90 }}
      animate={{ opacity: 1, scale: 1, borderRadius: "8px", rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9, borderRadius: "100%", rotate: 90 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{
        scale: 0.9,
        rotate: -90,
        borderRadius: "100%",
      }}
      style={{
        backgroundColor: block.color,
        borderRadius: "8px",
      }}
      className="relative flex size-32 cursor-pointer items-center justify-center border border-white/40 bg-origin-border outline-none"
      onClick={() => setTimerReseted((v) => v + 1)}
      onKeyUp={(e) => {
        if (e.key == "Enter") {
          setTimerReseted((v) => v + 1)
        }
      }}
    >
      <span className="absolute z-10 flex size-20 select-none items-center justify-center rounded-lg  bg-black/30 bg-origin-border text-[2.5rem]  font-extrabold tabular-nums leading-none backdrop-blur-xl">
        {Math.ceil(block.time)}
      </span>
    </motion.div>
  )
}

export default ColorfulBlock
