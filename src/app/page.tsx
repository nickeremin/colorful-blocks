"use client"

import React from "react"
import Link from "next/link"
import Header from "@/components/header"
import NewBlockForm from "@/components/new-block-form"
import { Particles } from "@/components/particles"
import RandomBlocks from "@/components/random-blocks"
import ShuffleButton from "@/components/shuffle-button"
import SortButton from "@/components/sort-button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Particles quantity={100} className="absolute inset-0 " />
      <Header />
      <main className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col gap-10 px-6 pb-6">
        <div className="flex items-center gap-4">
          <ShuffleButton />
          <NewBlockForm />
          <SortButton />
        </div>
        <RandomBlocks />
      </main>
      <footer className="mx-auto flex h-20 w-full max-w-screen-xl items-center px-6">
        <span className="select-none font-medium text-tertiary">
          Built by{" "}
          <Link
            href="https://github.com/nickeremin/colorful-blocks"
            className="font-bold text-secondary decoration-2 hover:underline"
          >
            nickeremin
          </Link>
        </span>
      </footer>
    </div>
  )
}
