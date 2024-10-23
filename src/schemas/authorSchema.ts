import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(1, { message: "Author name is required" }),
  bio: z.string().optional(),
});

export type AuthorSchemaType = z.infer<typeof authorSchema>;
