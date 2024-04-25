"use client"

import React from "react"
import { useBlockStore } from "@/store/block-store-provider"
import { ShuffleIcon } from "@radix-ui/react-icons"

import { ColorfulBlock } from "@/shared/types/block"
import { Button } from "@/shared/ui/button"
import { Tooltip } from "@/shared/ui/tooltip"

function shuffleBlocks(blocks: ColorfulBlock[]) {
  const shuffledBlocks = [...blocks]

  for (let i = shuffledBlocks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    const temp = shuffledBlocks[i]
    shuffledBlocks[i] = shuffledBlocks[j]
    shuffledBlocks[j] = temp
  }

  return shuffledBlocks
}

function ShuffleButton() {
  const blocks = useBlockStore((state) => state.blocks)
  const setBlocks = useBlockStore((state) => state.setBlocks)

  return (
    <Tooltip content="Shuffle">
      <Button
        variant="outline"
        size="icon"
        className="size-12 shrink-0 rounded-lg"
        onClick={() => setBlocks(shuffleBlocks(blocks))}
      >
        <ShuffleIcon className="size-6" />
      </Button>
    </Tooltip>
  )
}

export default ShuffleButton
