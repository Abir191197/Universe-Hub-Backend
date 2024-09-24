import mongoose from "mongoose";

// Define the interface for the Counseling document
export interface IGroupStudy {
  CreateByName: string;
  CreateByEmail: string;
  BookedByEmail?: string[];
  BookedByName?: string[];
  BookedByPhone?: string[];
  topic: string;
  Description: string;
  imgSrc?: string;
  selectDate: string;
  MeetLink?: string;
  TotalJoin?: number;
  isCompleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
