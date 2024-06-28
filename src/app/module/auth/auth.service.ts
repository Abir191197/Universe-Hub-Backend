import { findLastCreatedUser } from "../users/user.utils";
import { TUser } from "../users/users.interface";
import UserModel from "../users/users.model";



export const signUpUserIntoDB = async (payload: TUser) => {
  try {
    // Get the last user ID and calculate the next ID
    const lastUserId = await findLastCreatedUser();
    let newUserId = 1; // Default starting ID if no users exist

    if (lastUserId) {
      newUserId = lastUserId + 1; // Increment last user ID
    }

    // Assign the new user ID to the payload
    payload.id = newUserId;

    // Create the user in the database
    const result = await UserModel.create(payload);
    const { password, ...userWithoutSensitiveFields } = result.toObject();
    return userWithoutSensitiveFields;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Handle the error appropriately in your application
  }
};

export const AuthServices = {
  signUpUserIntoDB,
};
