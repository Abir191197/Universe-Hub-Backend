import { z } from "zod";

// Define the Zod schema based on your Mongoose schema
const FileValidationSchema = z.object({
  body: z.object({
    type: z.enum(["Question", "Video", "Personal Note"]),
  }),
});

export const FileValidation = { FileValidationSchema };
