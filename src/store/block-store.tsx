import { createStore } from "zustand/vanilla"

import type { ColorfulBlock, SortType } from "@/shared/types/block"
import { DEFAULT_EXPIRE_TIME } from "@/shared/lib/utils"

type BlockState = {
  blocks: ColorfulBlock[]
  sort: SortType
}

type BlockActions = {
  setBlocks: (blocks: ColorfulBlock[]) => void
  tickBlocks: (time: number) => void
  addNewBlock: (block: ColorfulBlock) => void
  resetBlock: (blockId: string) => void
  deleteBlock: (blockId: string) => void
  sortBlocks: () => void
}

export type BlockStore = BlockState & BlockActions

export function createBlockStore() {
  return createStore<BlockStore>()((set) => ({
    blocks: [],
    sort: "none",
    setBlocks: (blocks) => set(() => ({ blocks })),
    tickBlocks: (time) =>
      set(({ blocks }) => ({
        blocks: blocks.map((block) => ({ ...block, time: block.time - time })),
      })),
    addNewBlock: (block) =>
      set(({ blocks, sort }) => {
        let insertIndex = 0
        if (sort == "ascending") {
          while (
            insertIndex < blocks.length &&
            blocks[insertIndex].time < block.time
          )
            insertIndex++
        } else if (sort == "descending") {
          while (
            insertIndex < blocks.length &&
            blocks[insertIndex].time > block.time
          )
            insertIndex++
        } else {
          insertIndex = Math.floor(Math.random() * (blocks.length + 1))
        }
        return { blocks: blocks.toSpliced(insertIndex, 0, block) }
      }),
    resetBlock: (blockId) =>
      set(({ blocks }) => ({
        blocks: blocks.map((block) =>
          block.id == blockId ? { ...block, time: DEFAULT_EXPIRE_TIME } : block
        ),
      })),
    deleteBlock: (blockId) =>
      set(({ blocks }) => ({
        blocks: blocks.filter((block) => block.id != blockId),
      })),
    sortBlocks: () =>
      set(({ blocks, sort }) => {
        if (sort == "ascending") {
          return {
            sort: "descending",
            blocks: blocks.sort((a, b) => b.time - a.time),
          }
        } else if (sort == "descending") {
          return {
            sort: "none",
            blocks,
          }
        } else {
          return {
            sort: "ascending",
            blocks: blocks.sort((a, b) => a.time - b.time),
          }
        }
      }),
  }))
}
