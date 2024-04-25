"use client"

import React from "react"
import { useBlockStore } from "@/store/block-store-provider"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/shared/ui/button"

function EmptyBlockList() {
  const blocks = useBlockStore((state) => state.blocks)
  const generateRandomBlocks = useBlockStore(
    (state) => state.generateRandomBlocks
  )

  const isEmpty = blocks.length == 0

  return (
    <AnimatePresence>
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-background-100 flex w-fit flex-col items-center gap-8 rounded-lg border border-white/30 bg-origin-border p-4 sm:p-8"
        >
          <p className="select-none text-center text-[1.75rem] font-bold">
            All blocks have faded into the unknown&nbsp;&#127756;
          </p>
          <Button
            size="lg"
            className="rounded-full"
            onClick={generateRandomBlocks}
          >
            Refresh
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EmptyBlockList
