"use client"

import React from "react"
import { useBlockStore } from "@/store/block-store-provider"
import { motion } from "framer-motion"

import { type ColorfulBlock } from "@/shared/types/block"

interface ColorfulBlockProps {
  block: ColorfulBlock
}

function ColorfulBlock({ block }: ColorfulBlockProps) {
  const resetBlock = useBlockStore((state) => state.resetBlock)
  const deleteBlock = useBlockStore((state) => state.deleteBlock)

  React.useEffect(() => {
    if (block.time <= 0) {
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
      onClick={() => resetBlock(block)}
      onKeyUp={(e) => {
        if (e.key == "Enter") {
          resetBlock(block)
        }
      }}
    >
      <span className="absolute z-10 flex size-20 select-none items-center justify-center rounded-lg  bg-black/30 bg-origin-border text-[2.5rem]  font-extrabold tabular-nums leading-none backdrop-blur-xl">
        {block.time > -1 && Math.ceil(block.time)}
      </span>
    </motion.div>
  )
}

export default ColorfulBlock
