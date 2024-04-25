"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background text-base group-[.toaster]:text-primary group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-black",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-tertiary",
          error: "group-[.toaster]:border-red/50 group-[.toaster]:!text-red",
          success:
            "group-[.toaster]:border-green/50 group-[.toaster]:!text-green",
          icon: "[&>svg]:size-6 [&>svg]:stroke-2",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
