// message.controller.js
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MessageService } from "./message.service";
import { getSocket } from "../../../socket";

const sendMessage = catchAsync(async (req, res) => {
  const { sender, receiver, content } = req.body;

  const result = await MessageService.addMessageToDB({
    sender,
    receiver,
    message: content,
  });

  // Emit the new message to the receiver in real-time using Socket.IO
  const io = getSocket();
  io.to(receiver).emit("receiveMessage", {
    _id: result._id,
    sender,
    receiver,
    content,
    timestamp: result.timestamp,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message sent successfully.",
    data: result,
  });
});

const getAllMessages = catchAsync(async (req, res) => {
  const { sender, receiver } = req.query;
  const result = await MessageService.getMessagesFromDB({ sender, receiver });

  // Emit updated message list to the sender
  const io = getSocket();
  io.to(sender as string).emit("messageListUpdated", result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Messages retrieved successfully.",
    data: result,
  });
});

const deleteMessage = catchAsync(async (req, res) => {
  const { messageId } = req.params;
  const result = await MessageService.deleteMessageFromDB(messageId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message deleted successfully.",
    data: result,
  });
});

const getSideBarReceiver = catchAsync(async (req, res) => {
  const { sender } = req.query;
  const result = await MessageService.getReceiverFromDB(sender as any);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Receivers retrieved successfully.",
    data: result,
  });
});

export const MessageControllers = {
  sendMessage,
  getAllMessages,
  deleteMessage,
  getSideBarReceiver,
};
