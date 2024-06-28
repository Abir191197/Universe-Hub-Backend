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
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ['https://universe-hub.vercel.app/'], credentials: true }));
// application routes
app.use('/api/v1', routes_1.default);
/;
app.get('/', (req, res) => {
    res.send('server run 24x7');
});
app.use(globalErrorhandler_1.default); // This is connected with the globalErrorhandler.ts file at the middleware folder.
//Not Found
app.use(notFound_1.default); // This is connected with the notFound.ts file at the middleware folder.
exports.default = app;
