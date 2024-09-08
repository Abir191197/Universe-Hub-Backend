"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupStudyValidation = exports.GroupStudyValidationSchema = void 0;
const zod_1 = require("zod");
exports.GroupStudyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        TopicName: zod_1.z.string().min(1, { message: "topic name is required" }),
        Description: zod_1.z.string().optional(),
        date: zod_1.z.string().optional(),
        meetLink: zod_1.z.string().optional(),
        imageSrc: zod_1.z.string().optional(),
    }),
});
exports.GroupStudyValidation = {
    GroupStudyValidationSchema: exports.GroupStudyValidationSchema,
};
