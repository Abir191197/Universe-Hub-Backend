// forum.controller.ts
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { forumService } from "./forum.service";
import AppError from "../../errors/AppError";
import { TUser } from "../users/users.interface";


const getAllPosts = catchAsync(async (req, res) => {
  const result = await forumService.getAllPostsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts retrieved successfully",
    data: result,
  });
});

const getPost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await forumService.getPostFromDB(postId);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post retrieved successfully",
    data: result,
  });
});

const createPost = catchAsync(async (req, res) => {
  const user = req.user as TUser;
  const payload = {
    ...req.body,
    author: user.id.toString(),
    file: req.file,
  };
  const result = await forumService.createPostInDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const user = req.user as TUser;
  const payload = {
    ...req.body,
    file: req.file,
  };
  const result = await forumService.updatePostInDB(postId, user, payload);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post updated successfully",
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const user = req.user as TUser;
  await forumService.deletePostFromDB(postId, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post deleted successfully",
  });
});

const addComment = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const user = req.user as TUser;
  const payload = {
    content: req.body.content,
    author: user.id.toString(),
    file: req.file,
  };
  const result = await forumService.addCommentToPost(postId, payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Comment added successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { postId, commentId } = req.params;
  const user = req.user as TUser;
  await forumService.deleteCommentFromPost(postId, commentId, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted successfully",
  });
});

export const forumController = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
};
