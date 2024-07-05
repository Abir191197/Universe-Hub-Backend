import mongoose, { Schema } from "mongoose";
import { TUser } from "./users.interface";

const UserSchema = new Schema<TUser>(
  {
    id: {
      type: Number,
      required: true,
      default: 1000,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Courses", default: [] }],
    role: {
      type: String,
      required: true,
      default: "student",
    },
    status: {
      type: String,
      required: true,
      default: "Active",
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<TUser>("Users", UserSchema, "Users");

export default UserModel;
