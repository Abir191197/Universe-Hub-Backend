"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    uploadedBy: { type: String, required: true },
    fileName: { type: String, required: true },
    fileDescription: { type: String, required: true },
    type: { type: String, enum: ["question", "note", "lecture"], required: true },
    fileUrl: { type: String, required: true },
    courseId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Courses", required: true },
    courseName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const FileModel = (0, mongoose_1.model)("File", fileSchema, "Files");
exports.default = FileModel;
