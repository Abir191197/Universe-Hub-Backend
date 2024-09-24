import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import UserModel from "./users.model";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "./users.interface";
import QueryBuilder from "../../builders/QueryBuilder";
import { userSearchableFields } from "../courses/courses.constant";

//find one user into DB

const findUserFromDB = async (payload: JwtPayload | null) => {
  try {
    // Check if payload is not null
    if (payload !== null) {
      // Find user by email
      const result = await UserModel.findOne({
        email: payload.email,
      })
        .select("-password") // Exclude password field from results
        .populate("courses"); // Populate courses field

      // Check if user is found
      if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
      }

      // Check if user status is 'Suspended'
      if (result.status === "Suspended") {
        throw new AppError(httpStatus.FORBIDDEN, "User account is suspended");
      }

      // Return the user data
      return result;
    }

    // Handle case where payload is null
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token payload");
  } catch (error) {
    // Handle and throw errors
    throw new AppError(
      httpStatus.BAD_REQUEST,
       "Failed to get user"
    );
  }
};


//Updated User Into DB


const updatedUserIntoDB = async (
  payload: JwtPayload | null,
  updateData: Partial<TUser>
) => {
  try {
    if (payload !== null) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email: payload.email },
        { $set: updateData },
        { new: true, runValidators: true }
      ).select("-password"); // Exclude the password field from the result

      if (!updatedUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
      }

      return updatedUser;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid payload");
    }
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update user");
  }
};


//updated  role student into DB

const updatedRoleIntoDB = async(
  id:string
) => {
  try {
    
    const isUserExist = await UserModel.findOne({ _id: id });

    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    
    if (isUserExist.role === "admin")
    {
      throw new AppError(httpStatus.BAD_REQUEST, "User already admin role");
    }

    
    isUserExist.role = "admin";

    await isUserExist.save();

    return isUserExist;
  } catch (error) {
    throw error;
  }
}

const BanIntoDB = async (id: string) => {
  try {
    // Check if the user exists
    const isUserExist = await UserModel.findById(id);

    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // Check if the user is already suspended
    if (isUserExist.status === "Suspended") {
      throw new AppError(httpStatus.BAD_REQUEST, "User is already suspended");
    }

    // Update the user's status to 'Suspended'
    isUserExist.status = "Suspended";

    // Save the changes to the database
    await isUserExist.save();

    // Return the updated user information
    return isUserExist;
  } catch (error) {
    // If it's an AppError, rethrow it, otherwise wrap it in a new AppError
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to suspend user"
    );
  }
};



//active the user


const ActiveUserIntoDB = async (id: string) => {
  try {
    // Check if the user exists
    const isUserExist = await UserModel.findById(id);

    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // Check if the user is already active
    if (isUserExist.status === "Active") {
      throw new AppError(httpStatus.BAD_REQUEST, "User is already active");
    }

    // Update the user's status to 'Active'
    isUserExist.status = "Active";

    // Save the changes to the database
    await isUserExist.save();

    // Return the updated user information
    return isUserExist;
  } catch (error) {
    // If it's an AppError, rethrow it, otherwise wrap it in a new AppError
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to activate user"
    );
  }
};


//get All USer

const GetAllUserFromDB = async (query: Record<string, unknown>) => {
  try {
    // Prepare the query object for users
    const queryObj = { ...query };

    // Use the QueryBuilder to build the user query
    const userQuery = new QueryBuilder(UserModel.find(), queryObj)
      .search(userSearchableFields) // Assuming userSearchableFields is defined
    

    // Fetch all users from the database
    const result = await userQuery.modelQuery;

    return result;
  } catch (error) {
    // Throw a custom error if something goes wrong
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to get all users");
  }
};




export const UserService = {
  findUserFromDB,
  updatedUserIntoDB,
  updatedRoleIntoDB,
  GetAllUserFromDB,
  BanIntoDB,
  ActiveUserIntoDB,
};