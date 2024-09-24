import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import { initSocket } from "./socket"; // Import the socket module

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://universe-hub.vercel.app",
    "https://universe-hub-backend.onrender.com",
  ],
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  optionsSuccessStatus: 200,
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

// Application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server runs 24x7");
});

// Global error handler
app.use(globalErrorHandler);
app.use(notFound);

export default app;
