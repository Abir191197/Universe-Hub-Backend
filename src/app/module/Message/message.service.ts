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
const getReceiverFromDB = async (userId: Types.ObjectId) => {
  try {
    // Find messages where the user is either the sender or the receiver
    const messages = await MessageModel.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    // Create a Set to collect unique contact IDs (both senders and receivers)
    const contactIds = new Set();

    messages.forEach((message) => {
      // Add the receiver ID if the user is the sender
      if (message.sender.toString() === userId.toString()) {
        contactIds.add(message.receiver.toString());
      }
      // Add the sender ID if the user is the receiver
      if (message.receiver.toString() === userId.toString()) {
        contactIds.add(message.sender.toString());
      }
    });

    // Convert Set to an array of unique contact IDs
    const uniqueContactIds = Array.from(contactIds);

    if (uniqueContactIds.length === 0) {
      return []; // No contacts found
    }

    // Find the users corresponding to the contact IDs, excluding the password field
    const contacts = await UserModel.find({
      _id: { $in: uniqueContactIds },
    }).select("-password");

    return contacts;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to retrieve contacts");
  }
};








export const MessageService = {
  addMessageToDB,
  getMessagesFromDB,
  deleteMessageFromDB,
  getReceiverFromDB,
};
