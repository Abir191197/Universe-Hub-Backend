import { z } from "zod";

// Define the Zod schema based on your Mongoose schema
const FileValidationSchema = z.object({
   body: z.object({
   
    type: z.enum(["question", "note", "lecture"]),
    
  }),
});

export const FileValidation = { FileValidationSchema };
