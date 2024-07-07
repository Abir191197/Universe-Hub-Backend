import { Schema, model } from 'mongoose';
import { ICounseling } from './counseling.interface';

const CounselingSchema = new Schema<ICounseling>({
  createBy: String, // Should match the type 'string' from ICounseling
  Duration: {
    type: Number,
    enum: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    required: true,
  },
  selectDate: { type: Date, required: true },
  Type: { type: String, enum: ["online", "offline"], required: true },
  MeetLink: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CounselingModel = model<ICounseling>(
  "Counseling",
  CounselingSchema,
  "Counselings"
);

export default CounselingModel;
