import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import config from "../../config";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// Function to upload file to Cloudinary
export const sendImageToCloud = (
  fileName: string,
  path: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: fileName.trim(), resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          // Ensure result is defined before resolving
          resolve(result as UploadApiResponse);
        } else {
          reject(new Error("No result from Cloudinary upload"));
        }
      }
    );
  });
};

// Multer configuration for file upload
const storage = multer.memoryStorage(); // Use memory storage for serverless environments

const fileFilter = (req: any, file: any, cb: any) => {
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
  } else {
    cb(new Error("Invalid file type!"), false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
