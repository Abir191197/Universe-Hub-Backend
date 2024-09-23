"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const socket_1 = require("../../../socket"); // Adjust the import path as necessary
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const message_service_1 = require("./message.service");
const sendMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender, receiver, content } = req.body;
    const result = yield message_service_1.MessageService.addMessageToDB({
        sender,
        receiver,
        message: content,
    });
    // Emit the new message to the receiver in real-time using Socket.IO
    const io = (0, socket_1.getSocket)(); // Get the Socket.IO instance
    io.to(receiver).emit("receiveMessage", {
        sender,
        receiver,
        content,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Message sent successfully.",
        data: result,
    });
}));
const getAllMessages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender, receiver } = req.query;
    const result = yield message_service_1.MessageService.getMessagesFromDB({ sender, receiver });
    // Emit updated message list to the sender
    const io = (0, socket_1.getSocket)(); // Get the Socket.IO instance
    io.to(sender).emit("messageListUpdated", result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Messages retrieved successfully.",
        data: result,
    });
}));
// Controller to delete a message
const deleteMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId } = req.params;
    const result = yield message_service_1.MessageService.deleteMessageFromDB(messageId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Message deleted successfully.",
        data: result,
    });
}));
// Controller to get all getSideBarReceiver
const getSideBarReceiver = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender } = req.query;
    const result = yield message_service_1.MessageService.getReceiverFromDB(sender);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Messages retrieved successfully.",
        data: result,
    });
}));
exports.MessageControllers = {
    sendMessage,
    getAllMessages,
    deleteMessage,
    getSideBarReceiver,
};
