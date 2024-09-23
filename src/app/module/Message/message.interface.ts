import { Types } from "mongoose";

export interface IMessage {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  timestamp?: Date; // Optional since it will be auto-generated
}
