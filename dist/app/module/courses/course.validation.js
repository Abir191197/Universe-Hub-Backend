"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidation = exports.courseValidationSchema = void 0;
const zod_1 = require("zod");
exports.courseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseName: zod_1.z.string().min(1, { message: "Course name is required" }),
        files: zod_1.z.array(zod_1.z.string().uuid()).optional(),
        Description: zod_1.z.string().optional(),
        imageUrl: zod_1.z.string().optional(),
    }),
});
exports.CourseValidation = {
    courseValidationSchema: exports.courseValidationSchema,
};
