import mongoose, { Model, Schema } from "mongoose";
import { IGroupStudy } from "./GroupCounselling.interface";

// Define the Mongoose schema
const GroupStudySchema: Schema<IGroupStudy> = new Schema<IGroupStudy>({
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
const GroupStudyModel: Model<IGroupStudy> = mongoose.model<IGroupStudy>(
  "GroupStudy",
  GroupStudySchema
);

export default GroupStudyModel;
