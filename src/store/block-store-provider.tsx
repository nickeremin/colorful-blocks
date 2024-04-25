"use client"

import React from "react"
import { useStore, type StoreApi } from "zustand"

import { createBlockStore, type BlockStore } from "./block-store"

export const BlockStoreContext =
  React.createContext<StoreApi<BlockStore> | null>(null)

interface BlockStoreProviderProps {
  children: React.ReactNode
}

function BlockStoreProvider({ children }: BlockStoreProviderProps) {
  const storeRef = React.useRef<StoreApi<BlockStore>>()
  if (!storeRef.current) {
    storeRef.current = createBlockStore()
  }

  return (
    <BlockStoreContext.Provider value={storeRef.current}>
      {children}
    </BlockStoreContext.Provider>
  )
}

export const useBlockStore = <T,>(selector: (store: BlockStore) => T): T => {
  const blockStoreContext = React.useContext(BlockStoreContext)

  if (!blockStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`)
  }

  return useStore(blockStoreContext, selector)
}

export default BlockStoreProvider
