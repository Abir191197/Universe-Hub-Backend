import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import { findLastCreatedUser } from "../users/user.utils";
import { TUser } from "../users/users.interface";
import UserModel from "../users/users.model";
import config from "../../../config";

export const signUpUserIntoDB = async (payload: TUser) => {
  try {
    const lastUserId = await findLastCreatedUser();
    let newUserId = 1000;
    if (lastUserId) {
      newUserId = lastUserId + 1;
    }
    payload.id = newUserId;

    const hashedPassword = await bcrypt.hash(payload.password,Number (config.bcrypt_salt_rounds))
    
    payload.password = hashedPassword; //password Hashed

    const result = await UserModel.create(payload);

    const { password, ...userWithoutSensitiveFields } = result.toObject();
    return userWithoutSensitiveFields;
  } catch (error) {
    console.error("Error creating user:", error);
    throw AppError;
  }
};

export const AuthServices = {
  signUpUserIntoDB,
};
