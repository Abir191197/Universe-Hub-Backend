import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  cloudinary_cloud_name: process.env.cloudinary_cloud_name,
  cloudinary_api_key: process.env.cloudinary_api_key,
  cloudinary_api_secret: process.env.cloudinary_api_secret,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
  access_key: process.env.access_secret,
  refresh_key: process.env.refresh_secret,
  STORE_ID: process.env.STORE_ID,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SIGNATURE_KEY: process.env.SIGNATURE_KEY,
  PAYMENT_URL: process.env.PAYMENT_URL,
  PAYMENT_VERIFY_URL: process.env.PAYMENT_VERIFY_URL,
};
