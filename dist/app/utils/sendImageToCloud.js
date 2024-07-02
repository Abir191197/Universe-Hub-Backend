"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImageToCloud = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../../config"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
// Configuration
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const sendImageToCloud = (fileName, path) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(path, { public_id: fileName.trim(), resource_type: "auto" }, (error, result) => {
            if (error) {
                return reject(error);
            }
            if (!result) {
                return reject(new Error("No result from Cloudinary upload"));
            }
            resolve(result);
            // delete a file asynchronously
            fs_1.default.unlink(path, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${err.message}`);
                }
                else {
                    console.log("File deleted successfully.");
                }
            });
        });
    });
};
exports.sendImageToCloud = sendImageToCloud;
// Upload an image
//   export const sendImageToCloud = (
//   fileName: string,
//   path: string,
// ): Promise<Record<string, unknown>> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       path,
//       { public_id: fileName.trim(), resource_type: "auto" },
//       function (error, result) {
//         console.log(result);
//         if (error) {
//           reject(error);
//         }
//         resolve(result as UploadApiResponse);
//         // delete a file asynchronously
//         fs.unlink(path, (err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("File is deleted.");
//           }
//         });
//       }
//     );
//   });
// };
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = process.cwd() + "/uploads/";
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
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
