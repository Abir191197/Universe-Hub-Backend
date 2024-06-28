import { TUser } from "../users/users.interface";
import UserModel from "../users/users.model";

// signUpUserIntoDB function
const signUpUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  const { password, ...userWithoutSensitiveFields } = result.toObject();
  return userWithoutSensitiveFields;
};


export const AuthServices = {
  signUpUserIntoDB,
};

