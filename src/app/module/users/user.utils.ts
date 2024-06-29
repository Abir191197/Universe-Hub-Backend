import UserModel from "./users.model";

export const findLastCreatedUser = async () => {
  try {
    const lastUser = await UserModel.findOne({}).sort({ createdAt: -1 }).lean();
    if (lastUser && lastUser.id) {
      console.log("Last created user ID:", lastUser.id);
      return lastUser.id;
    } else {
      console.log("No user found or ID unavailable");
      return null; // Return null or handle appropriately when no user or ID is found
    }
  } catch (error) {
    console.error("Error finding last created user:", error);
    throw error; // You may want to handle this error more gracefully in your application
  }
};