import { z } from "zod";

export const courseValidationSchema = z.object({
  body: z.object({
    courseName: z.string().min(1, { message: "Course name is required" }),
    files: z.array(z.string().uuid()).optional(), // assuming files is an array of file IDs
  }),
});

export const CourseValidation = {
  courseValidationSchema,
};
