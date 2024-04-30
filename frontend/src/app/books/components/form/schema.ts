import { z } from "zod";

export const schemaSearch = z
  .object({
    title: z.string().min(1, "Por favor, informe um título!"),
    author: z.string(),
  })
  .transform((field) => ({
    title: field.title,
    author: field.author,
  }));
