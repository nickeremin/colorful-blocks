"use client"

import React from "react"
import { useBlockStore } from "@/store/block-store-provider"
import { AnimatePresence } from "framer-motion"

import { createRandomBlock } from "@/shared/lib/utils"

import ColorfulBlock from "./colorful-block"

function RandomBlocks() {
  const blocks = useBlockStore((state) => state.blocks)
  const setBlocks = useBlockStore((state) => state.setBlocks)

  React.useEffect(() => {
    const newBlocks = Array(Math.floor(Math.random() * 12) + 4)
      .fill(0)
      .map(createRandomBlock)
    setBlocks(newBlocks)

    return () => {
      setBlocks([])
    }
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
      <AnimatePresence>
        {blocks.map((block) => (
          <ColorfulBlock key={block.id} block={block} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default RandomBlocks
