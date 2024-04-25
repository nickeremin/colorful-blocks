import React from "react"

import { GradientText } from "@/shared/ui/gradient-text"

function Header() {
  return (
    <header className="select-none">
      <div className="mx-auto flex max-w-screen-xl items-center px-6 py-10">
        <GradientText className="whitespace-nowrap text-[2.75rem] font-black sm:text-[4rem]">
          Colorful Blocks
        </GradientText>
      </div>
    </header>
  )
}

export default Header
