"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const user_constant_1 = require("../users/user.constant");
const sendImageToCloud_1 = require("../../utils/sendImageToCloud");
const forum_controller_1 = require("./forum.controller");
const router = express_1.default.Router();
// Middleware to parse JSON from form data if necessary
const parseJsonMiddleware = (req, res, next) => {
    if (req.body.data) {
        try {
            req.body = JSON.parse(req.body.data);
        }
        catch (error) {
            return next(error);
        }
    }
    next();
};
// Get all posts
router.get("/posts", forum_controller_1.forumController.getAllPosts);
// Get a single post
router.get("/posts/:postId", forum_controller_1.forumController.getPost);
// Create a new post
router.post("/posts", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), sendImageToCloud_1.upload.single("image"), // Optional: allow image uploads with posts
parseJsonMiddleware, forum_controller_1.forumController.createPost // Complete the missing controller function here
);
// Update a post
router.put("/posts/:postId", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), sendImageToCloud_1.upload.single("image"), // Optional: allow image uploads with posts
parseJsonMiddleware, forum_controller_1.forumController.updatePost);
// Delete a post
router.delete("/posts/:postId", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), forum_controller_1.forumController.deletePost);
// Add a comment to a post
router.post("/posts/:postId/comments", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), parseJsonMiddleware, forum_controller_1.forumController.addComment);
// Delete a comment
router.delete("/posts/:postId/comments/:commentId", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.student), forum_controller_1.forumController.deleteComment);
exports.ForumRoutes = router;
