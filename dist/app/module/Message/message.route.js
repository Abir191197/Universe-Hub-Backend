"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoute = void 0;
const express_1 = __importDefault(require("express"));
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const message_controller_1 = require("./message.controller");
const user_constant_1 = require("../users/user.constant");
const router = express_1.default.Router();
// Route to send a message
router.post("/sendMessage", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), message_controller_1.MessageControllers.sendMessage);
// Route to get all messages between two users
router.get("/getAllMessages", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), message_controller_1.MessageControllers.getAllMessages);
// Route to delete a message
router.delete("/deleteMessage/:messageId", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), message_controller_1.MessageControllers.deleteMessage);
router.get("/getSideBarReceiver", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), message_controller_1.MessageControllers.getSideBarReceiver);
exports.MessageRoute = router;
