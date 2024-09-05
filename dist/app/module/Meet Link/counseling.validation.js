"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounselingValidation = void 0;
const zod_1 = require("zod");
// Define the Zod schema based on your Mongoose schema
const CounselingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        CreateBy: zod_1.z.string().optional(),
        CreateByEmail: zod_1.z.string().optional(),
        BookedBy: zod_1.z
            .string()
            .refine((val) => /^[a-f\d]{24}$/i.test(val), {
            message: "Invalid ObjectId format",
        })
            .nullable()
            .optional(),
        BookedByName: zod_1.z.string().optional(),
        BookedByPhone: zod_1.z.string().optional(),
        TopicName: zod_1.z.string().min(1, { message: "Topic name is required" }),
        Description: zod_1.z.string().min(1, { message: "Description is required" }),
        CashAmount: zod_1.z
            .number()
            .nonnegative({ message: "Cash amount must be a non-negative number" })
            .optional(), // Optional because CashAmount might not be present if the session is free
        Duration: zod_1.z
            .enum(["10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"])
            .transform(Number),
        selectDate: zod_1.z.string(), // Expecting a Date object for selectDate
        Type: zod_1.z.enum(["online", "offline"]),
        imgSrc: zod_1.z.union([zod_1.z.string(), zod_1.z.null()]).optional(), // Accept string URL or null
        MeetLink: zod_1.z.union([zod_1.z.string(), zod_1.z.null()]).optional(),
        isPayment: zod_1.z.boolean().optional(),
        StudyRoomNumber: zod_1.z.string().optional(),
        isBooked: zod_1.z.boolean().optional(),
        isCompleted: zod_1.z.boolean().optional(),
        createdAt: zod_1.z.date().optional(), // Expecting a Date object
        updatedAt: zod_1.z.date().optional(), // Expecting a Date object
    }),
});
exports.CounselingValidation = { CounselingValidationSchema };
