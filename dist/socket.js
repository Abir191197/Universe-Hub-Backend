"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: [
                "http://localhost:5173",
                "https://universe-hub.vercel.app",
                "https://universe-hub-backend.onrender.com",
                "https://universe-hub-frontend.onrender.com",
            ],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log("New client connected");
        socket.on("joinRoom", (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined room`);
        });
        socket.on("sendMessage", ({ sender, receiver, content }) => {
            console.log(`Message from ${sender} to ${receiver}: ${content}`);
            io.to(receiver).emit("receiveMessage", { sender, content });
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};
exports.initSocket = initSocket;
const getSocket = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized");
    }
    return io;
};
exports.getSocket = getSocket;
