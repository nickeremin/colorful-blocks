import { createStore } from "zustand/vanilla"

import type { ColorfulBlock, SortType } from "@/shared/types/block"
import { createColorfulBlock, DEFAULT_EXPIRE_TIME } from "@/shared/lib/utils"

type BlockState = {
  blocks: ColorfulBlock[]
  sort: SortType
}

type BlockActions = {
  generateRandomBlocks: () => void
  setBlocks: (blocks: ColorfulBlock[]) => void
  tickBlocks: (time: number) => void
  addNewBlock: (block: ColorfulBlock) => void
  resetBlock: (block: ColorfulBlock) => void
  deleteBlock: (blockId: string) => void
  sortBlocks: () => void
}

export type BlockStore = BlockState & BlockActions

export function createBlockStore() {
  return createStore<BlockStore>()((set) => ({
    blocks: [],
    sort: "none",
    generateRandomBlocks: () =>
      set(() => ({
        blocks: Array(Math.floor(Math.random() * 32) + 8)
          .fill(0)
          .map(createColorfulBlock),
      })),
    setBlocks: (blocks) => set(() => ({ blocks })),
    tickBlocks: (time) =>
      set(({ blocks }) => ({
        blocks: blocks.map((block) => ({ ...block, time: block.time - time })),
      })),
    addNewBlock: (block) =>
      set(({ blocks, sort }) => {
        let insertIndex: number

        // Find right index to insert element
        if (sort == "ascending") {
          insertIndex = blocks.length + 1
        } else if (sort == "descending") {
          insertIndex = 0
        } else {
          // If no sort insert in random place
          insertIndex = Math.floor(Math.random() * (blocks.length + 1))
        }

        return { blocks: blocks.toSpliced(insertIndex, 0, block) }
      }),
    resetBlock: ({ id: blockId, color }) =>
      set(({ blocks, sort }) => {
        const resetedBlock: ColorfulBlock = {
          id: blockId,
          color,
          time: DEFAULT_EXPIRE_TIME,
        }

        if (sort == "ascending") {
          return {
            blocks: [
              ...blocks.filter((block) => block.id != blockId),
              resetedBlock,
            ],
          }
        } else if (sort == "descending") {
          return {
            blocks: [
              resetedBlock,
              ...blocks.filter((block) => block.id != blockId),
            ],
          }
        } else {
          return {
            blocks: blocks.map((block) =>
              block.id == blockId
                ? { ...block, time: DEFAULT_EXPIRE_TIME }
                : block
            ),
          }
        }
      }),
    deleteBlock: (blockId) =>
      set(({ blocks }) => ({
        blocks: blocks.filter((block) => block.id != blockId),
      })),
    sortBlocks: () =>
      set(({ blocks, sort }) => {
        // Sort blocks and change sort mode
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
