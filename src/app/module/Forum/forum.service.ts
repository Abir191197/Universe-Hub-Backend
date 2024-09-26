// forum.service.ts
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IComment, IPost } from "./forum.interface";
import { sendImageToCloud } from "../../utils/sendImageToCloud";
import { Post } from "./forum.model";
import { Types } from "mongoose";
import { TUser } from "../users/users.interface";

const getAllPostsFromDB = async () => {
  try {
    const posts = await Post.find().populate("author", "username");
    return posts;
  } catch (error) {
    throw error;
  }
};

const getPostFromDB = async (postId: string) => {
  try {
    const post = await Post.findById(postId).populate("author", "username");
    if (!post) {
      throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }
    return post;
  } catch (error) {
    throw error;
  }
};

const createPostInDB = async (payload: {
  title: string;
  content: string;
  author: string;
  file?: Express.Multer.File;
}) => {
  try {
    let fileUrl;
    if (payload.file) {
      const { secure_url } = await sendImageToCloud(
        payload.file.originalname,
        payload.file.buffer
      );
      fileUrl = secure_url;
    }

    const newPost: Partial<IPost> = {
      title: payload.title,
      content: payload.content,
      author: new Types.ObjectId(payload.author),
      fileUrl: fileUrl,
    };

    const post = new Post(newPost);
    await post.save();
    return post.toObject();
  } catch (error) {
    throw error;
  }
};

const updatePostInDB = async (
  postId: string,
  user: TUser,
  payload: Partial<IPost>,
  file?: Express.Multer.File
) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    if (post.author.toString() !== user.id.toString()) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not authorized to update this post"
      );
    }

    if (file) {
      const { secure_url } = await sendImageToCloud(
        file.originalname,
        file.buffer
      );
      payload.fileUrl = secure_url;
    }

    Object.assign(post, payload);
    await post.save();
    return post.toObject();
  } catch (error) {
    throw error;
  }
};

const deletePostFromDB = async (postId: string, user: any) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    if (
      post.author.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not authorized to delete this post"
      );
    }

    // Use the deleteOne method instead of remove
    await Post.deleteOne({ _id: postId }); // or use post.delete()
    return { message: "Post deleted successfully" };
  } catch (error) {
    throw error;
  }
};


const addCommentToPost = async (
  postId: string,
  payload: {
    content: string;
    author: string;
    file?: Express.Multer.File;
  }
) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    let fileUrl;
    if (payload.file) {
      const { secure_url } = await sendImageToCloud(
        payload.file.originalname,
        payload.file.buffer
      );
      fileUrl = secure_url;
    }

    const newComment: IComment = {
      content: payload.content,
      author: new Types.ObjectId(payload.author),
      fileUrl: fileUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();
    return post.toObject();
  } catch (error) {
    throw error;
  }
};

const deleteCommentFromPost = async (
  postId: string,
  commentId: string,
  user: TUser
) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment._id?.toString() === commentId
    );
    if (commentIndex === -1) {
      throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
    }

    if (
      post.comments[commentIndex].author.toString() !== user.id.toString() &&
      user.role !== "admin"
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not authorized to delete this comment"
      );
    }

    post.comments.splice(commentIndex, 1);
    await post.save();
    return post.toObject();
  } catch (error) {
    throw error;
  }
};

export const forumService = {
  getAllPostsFromDB,
  getPostFromDB,
  createPostInDB,
  updatePostInDB,
  deletePostFromDB,
  addCommentToPost,
  deleteCommentFromPost,
};
