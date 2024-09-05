import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import mongoose, { ClientSession } from "mongoose";

import AppError from "../../errors/AppError";
import { PaymentData, sendPaymentRequest } from "../Payment/payment.utils";
import UserModel from "../users/users.model";
import CounselingModel from "./counseling.model";

//createCounselingDataIntoDB

const createCounselingIntoDB = async (payload: { authUserInformation: any; EventInformation: any; }) => {
  const { authUserInformation, EventInformation } = payload;

  try {
    // Check if the user exists in the database
    const isUserExist = await UserModel.findOne({
      email: authUserInformation.email,
    });

    if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User Not Found");
    }

    const createByName = isUserExist.name;
    const CreateByEmail = isUserExist.email;
    // Prepare data for insertion
    const data = {
      CreateBy: createByName,
      CreateByEmail:CreateByEmail ,
      Description: EventInformation.Description,
      TopicName: EventInformation.TopicName,
      Duration: EventInformation.Duration,
      imgSrc: EventInformation.imgSrc,
      CashAmount: EventInformation.CashAmount, // Default to 0 if undefined
      selectDate: new Date(EventInformation.selectDate), // Convert string to 
      Type: EventInformation.Type,
      MeetLink: EventInformation.MeetLink,
      StudyRoomNumber: EventInformation.StudyRoomNumber,
    };

    // Create a new counseling session in the database
    const newCounseling = await CounselingModel.create(data);

    return newCounseling;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "An error occurred while creating the booking");
  }
};

//get ALl Event From DB and sent it  Controllers

const getCounsellingFromDB = async () => {
  try {
    // Retrieve counseling sessions where isCompleted is false
    const result = await CounselingModel.find({ isCompleted: false });

    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to retrieve Counseling"
    );
  }
};



//get one user counselling data

const getOwnerCounsellingFromDB = async (payload: { authUserInformation: any }) => {
  const { authUserInformation } = payload;
  
  try {
    // Check if the user exists in the database
    const isUserExist = await UserModel.findOne({
      email: authUserInformation.email,
    });

    if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User Not Found");
    }

    // Retrieve counselling data created by this user
    const counsellingData = await CounselingModel.find({
      CreateByEmail: authUserInformation.email,
    });

    // Return the counselling data
    return counsellingData;

  } catch (error) {
    console.error('Error in getOwnerCounsellingFromDB:', error); // Logging the error for debugging
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to retrieve Counselling"
    );
  }
}




//Booked Counselling by student
const EventBookingConfirmIntoDB = async (id: string, user: JwtPayload) => {
  // Start a session
  const session: ClientSession = await mongoose.startSession();

  try {
    // Start transaction
    session.startTransaction();

    // Check if the booking exists
    const booking = await CounselingModel.findById(id).session(session).exec();
    if (!booking) {
      throw new AppError(404, "Booking not found");
    }

    // Check if the booking is already confirmed or booked
    if (booking.isBooked) {
      throw new AppError(400, "Booking is already confirmed");
    }

    // Check if the user exists
    const isUserExist = await UserModel.findOne({ email: user.email })
      .session(session)
      .exec();
    if (!isUserExist) {
      throw new AppError(404, "User not found");
    }

    // Prepare payment data
    const paymentData: PaymentData = {
      id,
      amount: booking.CashAmount,
      UserName: isUserExist.name,
      UserEmail: isUserExist.email,
      UserPhone: isUserExist.phone,
      UserAddress: isUserExist.address,
    };

    // Initiate payment session
    let paymentSession;
    try {
      paymentSession = await sendPaymentRequest(paymentData);
    } catch (error) {
      console.error("Failed to create payment session:", error);
      await session.abortTransaction(); // Rollback transaction
      throw new AppError(500, "Failed to initiate payment session.");
    }

    // Update the booking status
    booking.isBooked = true;
    booking.BookedBy = isUserExist._id; // Assuming the user ID is used
    booking.BookedByName = isUserExist.name;
    booking.BookedByPhone = isUserExist.phone;
    await booking.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Return the payment session to the frontend
    return paymentSession;
  } catch (error) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    session.endSession();

    // Ensure AppError instances are properly thrown
    if (error instanceof AppError) {
      throw error;
    } else {
      // Convert non-AppError errors to AppError
      throw new AppError(500, "Internal server error");
    }
  }
};


//Event DELETE



const EventDeleteFromDB = async (id: string) => {
  try {
    // Delete counseling session by id
    const result = await CounselingModel.findByIdAndDelete(id);

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "Counseling session not found");
    }

    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to delete Counseling"
    );
  }
};

//Event Complete

const CompleteCounsellingUpdatedIntoBD = async (id: string) => {
  try {
    // Mark the counseling session as completed
    const result = await CounselingModel.findByIdAndUpdate(
      id, // First argument is the ID
      { isCompleted: true }, // Second argument is the update object
      { new: true } // Returns the updated document
    );

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "Counseling session not found");
    }

    return result;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update Counseling session");
  }
};








export const CounselingServices = {
  createCounselingIntoDB,
  getCounsellingFromDB,
  EventBookingConfirmIntoDB,
  getOwnerCounsellingFromDB,
  EventDeleteFromDB,
  CompleteCounsellingUpdatedIntoBD,
};
