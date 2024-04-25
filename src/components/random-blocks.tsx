"use client"

import React from "react"
import { useBlockStore } from "@/store/block-store-provider"
import { AnimatePresence } from "framer-motion"

import ColorfulBlock from "./colorful-block"
import EmptyBlockList from "./empty-block-list"

function RandomBlocks() {
  const blocks = useBlockStore((state) => state.blocks)
  const generateRandomBlocks = useBlockStore(
    (state) => state.generateRandomBlocks
  )
  const tickBlocks = useBlockStore((state) => state.tickBlocks)

  React.useEffect(() => {
    generateRandomBlocks()
  }, [])

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      tickBlocks(0.1)
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 flex justify-center sm:mt-10">
        <EmptyBlockList />
      </div>
      <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
        <AnimatePresence>
          {blocks.map((block) => (
            <ColorfulBlock key={block.id} block={block} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RandomBlocks
