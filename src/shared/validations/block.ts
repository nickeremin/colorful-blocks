import { z } from "zod"

export const newBlockSchema = z.object({
  color: z.string(),
})
