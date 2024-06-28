import mongoose, { Schema } from "mongoose";
import { TUser } from "./users.interface";

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "student",
    }, // Default role is "student"
  },
  { timestamps: true },
);

const UserModel = mongoose.model<TUser>("Users", UserSchema, "Users");

export default UserModel;
