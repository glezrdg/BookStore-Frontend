import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  authors: z
    .array(z.string())
    .nonempty({ message: "At least one author is required" }),
  categories: z
    .array(z.string())
    .nonempty({ message: "At least one category is required" }),
  publishedDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  description: z.string().optional(),
});

export type BookSchemaType = z.infer<typeof bookSchema>;
