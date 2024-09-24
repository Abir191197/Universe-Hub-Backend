import { z } from "zod";

export const GroupStudyValidationSchema = z.object({
  body: z.object({
    topic: z.string().min(1, { message: "topic name is required" }),
    Description: z.string().optional(),
    selectDate: z.string().optional(),
    MeetLink: z.string().optional(),
    imageSrc: z.string().optional(),
  }),
});

export const GroupStudyValidation = {
  GroupStudyValidationSchema,
};
