import { z } from "zod";

// Define the Zod schema based on your Mongoose schema
const CounselingValidationSchema = z.object({
  body: z.object({
   
    Duration: z
      .enum(["10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"])
      .transform(Number),
    selectDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    Type: z.enum(["online", "offline"]),
    MeetLink: z.string().url().optional(),
  }),
});

export const CounselingValidation = { CounselingValidationSchema };
