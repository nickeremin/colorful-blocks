import { z } from "zod"

import { newBlockSchema } from "../validations/block"

export type SortType = "none" | "ascending" | "descending"

export type ColorfulBlock = {
  id: string
  time: number
  color: string
}

export type NewBlockInputs = z.infer<typeof newBlockSchema>
