import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"

import "./globals.css"

import BlockStoreProvider from "@/store/block-store-provider"

import { cn } from "@/shared/lib/utils"
import { Toaster } from "@/shared/ui/sonner"
import { TooltipProvider } from "@/shared/ui/tooltip"

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900", "1000"],
})

export const metadata: Metadata = {
  title: "Colorful Blocks",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          nunito.className,
          "relative min-h-screen w-screen max-w-[100vw] overflow-x-hidden antialiased"
        )}
      >
        <BlockStoreProvider>
          <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
          <Toaster position="bottom-center" />
        </BlockStoreProvider>
      </body>
    </html>
  )
}
