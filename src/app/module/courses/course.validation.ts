import { z } from "zod";

export const courseValidationSchema = z.object({
  body: z.object({
    courseName: z.string().min(1, { message: "Course name is required" }),
    questions: z
      .array(
        z.object({
          userId: z.string().min(24, { message: "Invalid user ID" }), // Adjust length as per ObjectId format
          questionTitle: z
            .string()
            .min(1, { message: "Question title is required" }),
          questionFileUrl: z.string().url({ message: "Invalid URL format" }),
        })
      )
      .nullable(),
    notes: z
      .array(
        z.object({
          userId: z.string().min(24, { message: "Invalid user ID" }), // Adjust length as per ObjectId format
          noteTitle: z.string().min(1, { message: "Note title is required" }),
          noteContent: z
            .string()
            .min(1, { message: "Note content is required" }),
          noteFileUrl: z.string().url({ message: "Invalid URL format" }),
        })
      )
      .nullable(),
    lectures: z
      .array(
        z.object({
          userId: z.string().min(24, { message: "Invalid user ID" }), // Adjust length as per ObjectId format
          lectureTitle: z
            .string()
            .min(1, { message: "Lecture title is required" }),
          lectureContent: z
            .string()
            .min(1, { message: "Lecture content is required" }),
          lectureFileUrl: z.string().url({ message: "Invalid URL format" }),
        })
      )
      .nullable(),
  }),
});

export const CourseValidation = {
  courseValidationSchema,
};
