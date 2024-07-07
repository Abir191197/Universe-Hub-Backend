import { Schema, model } from 'mongoose';
import { IMeet } from './meet.interface';

const meetSchema = new Schema<IMeet>({
  createBy: { type: String, required: true },
  Duration: { type: Number, enum: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60], required: true },
  selectDate: { type: Date, required: true },
  Type: { type: String, enum: ['online', 'offline'], required: true },
  MeetLink: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const MeetModel = model<IMeet>('Meet', meetSchema, 'Meets');

export default MeetModel;
