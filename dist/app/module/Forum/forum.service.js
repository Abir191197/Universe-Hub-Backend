"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forumService = void 0;
// forum.service.ts
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendImageToCloud_1 = require("../../utils/sendImageToCloud");
const forum_model_1 = require("./forum.model");
const mongoose_1 = require("mongoose");
const users_model_1 = __importDefault(require("../users/users.model"));
const getAllPostsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield forum_model_1.Post.find()
            .populate("author", "name")
            .sort({ createdAt: -1 });
        return posts;
    }
    catch (error) {
        throw error;
    }
});
const getPostFromDB = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield forum_model_1.Post.findById(postId).populate("author", "name");
        if (!post) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
        }
        return post;
    }
    catch (error) {
        throw error;
    }
});
const createPostInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fileUrl;
        if (payload.file) {
            const { secure_url } = yield (0, sendImageToCloud_1.sendImageToCloud)(payload.file.originalname, payload.file.buffer);
            fileUrl = secure_url;
        }
        const newPost = {
            title: payload.title,
            content: payload.content,
            author: new mongoose_1.Types.ObjectId(payload.author),
            fileUrl: fileUrl,
            tags: payload.tags,
        };
        const post = new forum_model_1.Post(newPost);
        yield post.save();
        return post.toObject();
    }
    catch (error) {
        throw error;
    }
});
const updatePostInDB = (postId, user, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield forum_model_1.Post.findById(postId);
        if (!post) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
        }
        if (post.author.toString() !== user.id.toString()) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized to update this post");
        }
        if (file) {
            const { secure_url } = yield (0, sendImageToCloud_1.sendImageToCloud)(file.originalname, file.buffer);
            payload.fileUrl = secure_url;
        }
        Object.assign(post, payload);
        yield post.save();
        return post.toObject();
    }
    catch (error) {
        throw error;
    }
});
const deletePostFromDB = (postId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield forum_model_1.Post.findById(postId);
        if (!post) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
        }
        // Use the deleteOne method instead of remove
        yield forum_model_1.Post.deleteOne({ _id: postId }); // or use post.delete()
        return { message: "Post deleted successfully" };
    }
    catch (error) {
        throw error;
    }
});
const addCommentToPost = (postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield forum_model_1.Post.findById(postId);
        if (!post) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
        }
        const user = yield users_model_1.default.findById(payload.author).populate("name");
        let fileUrl;
        if (payload.file) {
            const { secure_url } = yield (0, sendImageToCloud_1.sendImageToCloud)(payload.file.originalname, payload.file.buffer);
            fileUrl = secure_url;
        }
        const newComment = {
            content: payload.content,
            author: new mongoose_1.Types.ObjectId(payload.author),
            CommentAuthorName: (user === null || user === void 0 ? void 0 : user.name) || '',
            fileUrl: fileUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        post.comments.push(newComment);
        yield post.save();
        return post.toObject();
    }
    catch (error) {
        throw error;
    }
});
const deleteCommentFromPost = (postId, commentId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield forum_model_1.Post.findById(postId);
        if (!post) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
        }
        const commentIndex = post.comments.findIndex((comment) => { var _a; return ((_a = comment._id) === null || _a === void 0 ? void 0 : _a.toString()) === commentId; });
        if (commentIndex === -1) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
        }
        post.comments.splice(commentIndex, 1);
        yield post.save();
        return post.toObject();
    }
    catch (error) {
        throw error;
    }
});
exports.forumService = {
    getAllPostsFromDB,
    getPostFromDB,
    createPostInDB,
    updatePostInDB,
    deletePostFromDB,
    addCommentToPost,
    deleteCommentFromPost,
};
