import { z } from "zod";

// Define the Zod schema based on your Mongoose schema
const CounselingValidationSchema = z.object({
  body: z.object({
    CreateBy: z.string().optional(),
    CreateByEmail: z.string().optional(),
    BookedBy: z
      .string()
      .refine((val) => /^[a-f\d]{24}$/i.test(val), {
        message: "Invalid ObjectId format",
      })
      .nullable()
      .optional(),
    BookedByName: z.string().optional(),
    BookedByPhone: z.string().optional(),
    TopicName: z.string().min(1, { message: "Topic name is required" }),
    Description: z.string().min(1, { message: "Description is required" }),
    CashAmount: z
      .number()
      .nonnegative({ message: "Cash amount must be a non-negative number" })
      .optional(), // Optional because CashAmount might not be present if the session is free

    Duration: z
      .enum(["10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"])
      .transform(Number),
    selectDate: z.string(), // Expecting a Date object for selectDate

    Type: z.enum(["online", "offline"]),
    imgSrc: z.union([z.string(), z.null()]).optional(), // Accept string URL or null
    MeetLink: z.union([z.string(), z.null()]).optional(),
    isPayment: z.boolean().optional(),
    StudyRoomNumber: z.string().optional(),
    isBooked: z.boolean().optional(),
    isCompleted: z.boolean().optional(),
    createdAt: z.date().optional(), // Expecting a Date object
    updatedAt: z.date().optional(), // Expecting a Date object
  }),
});

export const CounselingValidation = { CounselingValidationSchema };
