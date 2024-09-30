import express, { NextFunction, Request, Response } from "express";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "../users/user.constant";
import { upload } from "../../utils/sendImageToCloud";
import { forumController } from "./forum.controller";


const router = express.Router();

// Middleware to parse JSON from form data if necessary
const parseJsonMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.data) {
    try {
      req.body = JSON.parse(req.body.data);
    } catch (error) {
      return next(error);
    }
  }
  next();
};

// Get all posts
router.get("/posts", forumController.getAllPosts);

// Get a single post
router.get("/posts/:postId", forumController.getPost);

// Create a new post
router.post(
  "/posts",
  authVerify(USER_ROLE.admin, USER_ROLE.student),
  upload.single("file"), // Optional: allow image uploads with posts
  parseJsonMiddleware,
  forumController.createPost // Complete the missing controller function here
);

// Update a post
router.put(
  "/posts/:postId",
  authVerify(USER_ROLE.admin, USER_ROLE.student),
  upload.single("file"), // Optional: allow image uploads with posts
  parseJsonMiddleware,
  forumController.updatePost
);

// Delete a post
router.delete(
  "/posts/:postId",
  authVerify(USER_ROLE.admin, USER_ROLE.student),
  forumController.deletePost
);


router.post(
  "/posts/:postId/comments",
  authVerify(USER_ROLE.admin, USER_ROLE.student),
  upload.single("file"),
  parseJsonMiddleware,
  forumController.addComment
);

// Delete a comment
router.delete(
  "/posts/:postId/comments/:commentId",
  authVerify(USER_ROLE.admin, USER_ROLE.student),
  forumController.deleteComment
);

export const ForumRoutes = router;
