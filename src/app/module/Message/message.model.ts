import mongoose, { Schema } from "mongoose";
import { IMessage } from "./message.interface";

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel = mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;
