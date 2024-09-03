import mongoose from "mongoose";

// Define the interface for the Counseling document
export interface ICounseling {
  CreateBy: string;
  BookedBy?: mongoose.Types.ObjectId; // Optional
  BookedByName?: string; // Optional
  BookedByPhone?: string; // Optional
  TopicName: string;
  Description: string;
  CashAmount?: number; // Optional; if free, this will be omitted or set to null
  imgSrc?: string; // Optional
  Duration: 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60;
  selectDate: string;
  Type: "online" | "offline"; // Required field
  StudyRoomNumber: string;
  MeetLink?: string; // Optional; only required if Type is "online"
  isPayment?: boolean; // Optional; if omitted, default to false
  isBooked?: boolean; // Optional; if omitted, default to false
  createdAt: Date;
  updatedAt: Date;
}
