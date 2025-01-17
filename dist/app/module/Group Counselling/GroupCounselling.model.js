"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the Mongoose schema
const GroupStudySchema = new mongoose_1.Schema({
    CreateByName: { type: String, required: true },
    CreateByEmail: { type: String, required: true },
    BookedByEmail: [{ type: String, default: null }],
    BookedByName: [{ type: String, default: null }],
    BookedByPhone: [{ type: String, default: null }],
    topic: { type: String, required: true },
    Description: { type: String, required: true },
    imgSrc: { type: String, default: null },
    selectDate: { type: String, required: true },
    MeetLink: { type: String },
    TotalJoin: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Create the model
const GroupStudyModel = mongoose_1.default.model("GroupStudy", GroupStudySchema);
exports.default = GroupStudyModel;
