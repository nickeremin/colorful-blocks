"use client"

import React from "react"
import { useBlockStore } from "@/store/block-store-provider"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Tooltip } from "@/shared/ui/tooltip"

function SortButton() {
  const sort = useBlockStore((state) => state.sort)
  const sortBlocks = useBlockStore((state) => state.sortBlocks)

  return (
    <Tooltip content={`Sort ${sort}`}>
      <Button
        variant="none"
        size="icon"
        className={cn(
          "size-12 shrink-0 rounded-lg",
          sort == "none" && "bg-white",
          sort == "ascending" && "bg-blue",
          sort == "descending" && "bg-red"
        )}
        onClick={sortBlocks}
      ></Button>
    </Tooltip>
  )
}

export default SortButton
