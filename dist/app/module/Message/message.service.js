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
exports.MessageService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const message_model_1 = __importDefault(require("./message.model"));
const users_model_1 = __importDefault(require("../users/users.model"));
// Service to add a message to the database
const addMessageToDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ sender, receiver, message }) {
    try {
        const newMessage = yield message_model_1.default.create({
            sender,
            receiver,
            content: message,
        });
        return newMessage;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to send message");
    }
});
// Service to retrieve all messages between two users
const getMessagesFromDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ sender, receiver }) {
    try {
        const messages = yield message_model_1.default.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender },
            ],
        })
            .populate("receiver", "name") // Populate receiver with only the name field
            .sort({ timestamp: 1 }); // Sort by timestamp.sort({ timestamp: 1 }); // Sort by timestamp
        return messages; // Return the raw messages
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to retrieve messages");
    }
});
// Service to delete a message from the database by ID
const deleteMessageFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedMessage = yield message_model_1.default.findByIdAndDelete(id);
        if (!deletedMessage) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Message not found");
        }
        return deletedMessage;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to delete message");
    }
});
const getReceiverFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find messages where the user is either the sender or the receiver
        const messages = yield message_model_1.default.find({
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
        const contacts = yield users_model_1.default.find({
            _id: { $in: uniqueContactIds },
        }).select("-password");
        return contacts;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to retrieve contacts");
    }
});
exports.MessageService = {
    addMessageToDB,
    getMessagesFromDB,
    deleteMessageFromDB,
    getReceiverFromDB,
};
