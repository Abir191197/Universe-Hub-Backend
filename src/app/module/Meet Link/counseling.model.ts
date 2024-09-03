import mongoose, { Schema, Model } from "mongoose";
import { ICounseling } from "./counseling.interface";

// Define the Mongoose schema
const CounselingSchema: Schema<ICounseling> = new Schema<ICounseling>({
  CreateBy: { type: String, required: true },
  BookedBy: { type: Schema.Types.ObjectId, ref: "Users", default: null },
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


// Create the model
const CounselingModel: Model<ICounseling> = mongoose.model<ICounseling>(
  "Counseling",
  CounselingSchema
);

export default CounselingModel;
