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
const CounselingSchema = new mongoose_1.Schema({
    CreateBy: { type: String, required: true },
    CreateByEmail: { type: String, required: true },
    BookedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", default: null },
    BookedByName: { type: String, default: null },
    BookedByPhone: { type: String, default: null },
    TopicName: { type: String, required: true },
    Description: { type: String, required: true },
    CashAmount: { type: Number },
    imgSrc: { type: String, default: null },
    Duration: {
        type: Number,
        enum: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        required: true,
    },
    selectDate: { type: String, required: true },
    Type: { type: String, enum: ["online", "offline"], required: true },
    MeetLink: { type: String, default: null },
    StudyRoomNumber: { type: String, default: null },
    isPayment: { type: Boolean, default: false },
    isBooked: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Create the model
const CounselingModel = mongoose_1.default.model("Counseling", CounselingSchema);
exports.default = CounselingModel;
