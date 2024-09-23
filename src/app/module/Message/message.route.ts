import express from "express";
import authVerify from "../../middlewares/authVerify";
import { MessageControllers } from "./message.controller";
import { USER_ROLE } from "../users/user.constant";

const router = express.Router();

// Route to send a message
router.post(
  "/sendMessage",
  authVerify(USER_ROLE.admin, USER_ROLE.student),
  MessageControllers.sendMessage
);

// Route to get all messages between two users
router.get(
  "/getAllMessages",
  authVerify(USER_ROLE.admin, USER_ROLE.student),
  MessageControllers.getAllMessages
);

// Route to delete a message
router.delete(
  "/deleteMessage/:messageId",
  authVerify(USER_ROLE.admin, USER_ROLE.student),
  MessageControllers.deleteMessage
);


router.get(
  "/getSideBarReceiver",
  authVerify(USER_ROLE.admin, USER_ROLE.student),
  MessageControllers.getSideBarReceiver
);






export const MessageRoute = router;
