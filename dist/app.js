"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// Parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Allow multiple origins for CORS
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://universe-hub.vercel.app",
//   "http://localhost:5000/",
// ];
const corsOptions = {
    origin: ["http://localhost:5173", "https://universe-hub.vercel.app"],
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200,
    allowedHeaders: "Content-Type, Authorization",
};
app.use((0, cors_1.default)(corsOptions));
// Application routes
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Server runs 24x7");
});
// Global error handler
app.use(globalErrorhandler_1.default);
// Not Found middleware
app.use(notFound_1.default);
exports.default = app;
