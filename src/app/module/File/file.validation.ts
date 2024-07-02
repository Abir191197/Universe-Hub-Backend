import { z } from "zod";

export const fileValidationSchema = z.object({
  body: z.object({
    userId: z.string().uuid({ message: "Invalid user ID" }),
    courseId: z.string().uuid({ message: "Invalid course ID" }),
    type: z.enum(["question", "note", "lecture"], {
      message: "Invalid file type",
    }),
    fileUrl: z.string().url({ message: "Invalid file URL" }),
    fileName: z.string().min(1, { message: "File name is required" }),
    fileSize: z
      .number()
      .positive({ message: "File size must be a positive number" }),
    fileType: z.string().min(1, { message: "File type is required" }),
  }),
});

export const FileValidation = {
  fileValidationSchema,
};
