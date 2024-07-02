import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../../config';
import multer from 'multer';
import fs from 'fs';


// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});


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
           return reject(error);
         }
         if (!result) {
           return reject(new Error("No result from Cloudinary upload"));
         }
         resolve(result);

         // delete a file asynchronously
         fs.unlink(path, (err) => {
           if (err) {
             console.error(`Error deleting file: ${err.message}`);
           } else {
             console.log("File deleted successfully.");
           }
         });
       }
     );
   });
 };
  
  
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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = process.cwd() + "/uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

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