"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImageToCloud = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../../config"));
const multer_1 = __importDefault(require("multer"));
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
// Function to upload file to Cloudinary
const sendImageToCloud = (fileName, path) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(path, { public_id: fileName.trim(), resource_type: "auto" }, (error, result) => {
            if (error) {
                reject(error);
            }
            else if (result) {
                // Ensure result is defined before resolving
                resolve(result);
            }
            else {
                reject(new Error("No result from Cloudinary upload"));
            }
        });
    });
};
exports.sendImageToCloud = sendImageToCloud;
// Multer configuration for file upload
const storage = multer_1.default.memoryStorage(); // Use memory storage for serverless environments
const fileFilter = (req, file, cb) => {
    // Accept only specific file types
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "video/mp4",
        "video/avi",
        "video/mkv",
        "video/mov",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type!"), false);
    }
};
exports.upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
