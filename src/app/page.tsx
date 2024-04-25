"use client"

import React from "react"
import Header from "@/components/header"
import NewBlockForm from "@/components/new-block-form"
import RandomBlocks from "@/components/random-blocks"
import ShuffleButton from "@/components/shuffle-button"
import SortButton from "@/components/sort-button"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col gap-10 px-6 pb-20">
        <div className="flex items-center gap-4">
          <ShuffleButton />
          <NewBlockForm />
          <SortButton />
        </div>
        <RandomBlocks />
      </main>
    </div>
  )
}
