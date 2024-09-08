import mongoose from "mongoose";

// Define the interface for the Counseling document
export interface IGroupStudy {
  CreateByName: string;
  CreateByEmail: string;
  BookedByEmail?: string[];
  BookedByName?: string[];
  BookedByPhone?: string[];
  TopicName: string;
  Description: string;
  imgSrc?: string;
  selectDate: string;
  MeetLink?: string;
  TotalEnroll?: number;
  isCompleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
