import { z } from "zod";

export const courseValidationSchema = z.object({
  body: z.object({
    courseName: z.string().min(1, { message: "Course name is required" }),
    files: z.array(z.string().uuid()).optional(),
    Description: z.string().optional(),
    imageUrl: z.string().optional(),
  }),
});

export const CourseValidation = {
  courseValidationSchema,
};
