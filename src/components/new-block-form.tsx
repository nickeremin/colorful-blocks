"use client"

import React from "react"
import { useBlockStore } from "@/store/block-store-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "@radix-ui/react-icons"
import { nanoid } from "nanoid"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { type NewBlockInputs } from "@/shared/types/block"
import { DEFAULT_EXPIRE_TIME } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Form, FormField, FormItem } from "@/shared/ui/form"
import { Tooltip } from "@/shared/ui/tooltip"
import { newBlockSchema } from "@/shared/validations/block"

function NewBlockForm() {
  const addNewBlock = useBlockStore((state) => state.addNewBlock)

  const form = useForm<NewBlockInputs>({
    resolver: zodResolver(newBlockSchema),
    defaultValues: {
      color: "",
    },
  })

  function onSubmit({ color }: NewBlockInputs) {
    const hexColorPattern = /^[0-9A-Fa-f]{3,6}$/
    const isValid = hexColorPattern.test(color)

    if (isValid) {
      addNewBlock({
        id: nanoid(),
        time: DEFAULT_EXPIRE_TIME,
        color: `#${color}`,
      })
      form.reset()
      toast.success("Block created successfully!")
    } else {
      toast.error("Enter valid hex color!")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <div
                  data-input-wrapper
                  className="bg-background-100 relative flex h-12 w-full items-center rounded-lg sm:max-w-[240px]"
                >
                  <span className="text-secondary absolute left-3 top-1 flex h-10 w-3 select-none items-center justify-center text-xl/5 font-bold">
                    #
                  </span>
                  <input
                    data-input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="placeholder:text-tertiary flex size-full appearance-none rounded-[inherit] bg-inherit pl-7 pr-12 font-bold leading-none outline-none"
                    {...field}
                  />
                  <Tooltip sideOffset={12} content="Add new block">
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 size-10"
                    >
                      <PlusIcon className="size-6" />
                    </Button>
                  </Tooltip>
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}

export default NewBlockForm
