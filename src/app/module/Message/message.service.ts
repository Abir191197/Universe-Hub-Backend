import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import MessageModel from "./message.model";
import { Types } from "mongoose";
import UserModel from "../users/users.model";

// Service to add a message to the database
const addMessageToDB = async ({ sender , receiver, message }:any) => {
  try {
    const newMessage = await MessageModel.create({
      sender,
      receiver,
      content: message,
    });
    return newMessage;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to send message"
    );
  }
};

// Service to retrieve all messages between two users
const getMessagesFromDB = async ({ sender, receiver }:any) => {
  try {
    const messages = await MessageModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    })
      .populate("receiver", "name") // Populate receiver with only the name field
      .sort({ timestamp: 1 }); // Sort by timestamp.sort({ timestamp: 1 }); // Sort by timestamp

    return messages; // Return the raw messages
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to retrieve messages");
  }
};

// Service to delete a message from the database by ID
const deleteMessageFromDB = async (id: any) => {
  try {
    const deletedMessage = await MessageModel.findByIdAndDelete(id);

    if (!deletedMessage) {
      throw new AppError(httpStatus.NOT_FOUND, "Message not found");
    }

    return deletedMessage;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to delete message"
    );
  }
};

const getReceiverFromDB = async (sender: Types.ObjectId) => {
  try {
    // Find messages where the sender matches the provided sender ID
    const messages = await MessageModel.find({ sender });

    // Create a Set to collect unique receiver IDs
    const receiverIds = new Set();

    messages.forEach((message) => {
      // Add receiver ID to the Set
      receiverIds.add(message.receiver.toString()); // Ensure receiver is a string
    });

    // Convert Set to an array of unique receiver IDs
    const uniqueReceiverIds = Array.from(receiverIds);

    // Populate names for the unique receiver IDs, excluding the password field
    const receivers = await UserModel.find({
      _id: { $in: uniqueReceiverIds },
    }).populate("name", "-password");

    return receivers;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to retrieve receivers");
  }
};








export const MessageService = {
  addMessageToDB,
  getMessagesFromDB,
  deleteMessageFromDB,
  getReceiverFromDB,
};
