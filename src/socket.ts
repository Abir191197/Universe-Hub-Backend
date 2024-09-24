import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "https://universe-hub.vercel.app"],
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

export const getSocket = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};
