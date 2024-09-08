import { z } from "zod";

export const GroupStudyValidationSchema = z.object({
  body: z.object({
    TopicName: z.string().min(1, { message: "topic name is required" }),
    Description: z.string().optional(),
    date: z.string().optional(),
    meetLink: z.string().optional(),
    imageSrc: z.string().optional(),
  }),
});

export const GroupStudyValidation = {
  GroupStudyValidationSchema,
};
