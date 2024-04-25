"use client"

import React from "react"
import { useBlockStore } from "@/store/block-store-provider"
import { AnimatePresence } from "framer-motion"

import { createColorfulBlock } from "@/shared/lib/utils"

import ColorfulBlock from "./colorful-block"

function RandomBlocks() {
  const blocks = useBlockStore((state) => state.blocks)
  const setBlocks = useBlockStore((state) => state.setBlocks)
  const tickBlocks = useBlockStore((state) => state.tickBlocks)

  React.useEffect(() => {
    const newBlocks = Array(Math.floor(Math.random() * 24) + 8)
      .fill(0)
      .map(createColorfulBlock)
    setBlocks(newBlocks)

    return () => {
      setBlocks([])
    }
  }, [])

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      tickBlocks(0.1)
    }, 100)

    return () => clearInterval(intervalId)
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
