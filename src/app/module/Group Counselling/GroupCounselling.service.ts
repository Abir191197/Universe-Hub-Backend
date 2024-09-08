import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import UserModel from "../users/users.model";
import GroupStudyModel from "./GroupCounselling.model";

const createGroupStudyIntoDB = async (payload: {
  authUserInformation: any;
  EventInformation: any;
}) => {
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
      CreateByEmail: CreateByEmail,
      Description: EventInformation.Description,
      TopicName: EventInformation.TopicName,
      imgSrc: EventInformation.imgSrc,
      selectDate: new Date(EventInformation.selectDate), // Convert string to
      MeetLink: EventInformation.MeetLink,
    };

    // Create a new counseling session in the database
    const newGroupStudy = await GroupStudyModel.create(data);

    return newGroupStudy;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "An error occurred while creating the GroupStudy"
    );
  }
};

//Event DELETE

const GroupStudyDeleteFromDB = async (id: string) => {
  try {
    // Delete counseling session by id
    const result = await GroupStudyModel.findByIdAndDelete(id);

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "Group Study not found");
    }

    return result;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Group Study");
  }
};


//get ALl Group Study From DB and sent it  Controllers

const getAllCounsellingFromDB = async () => {
  try {
    // Retrieve counseling sessions where isCompleted is false
    const result = await GroupStudyModel.find({ isCompleted: false });

    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to retrieve Group Study"
    );
  }
};





export const GroupStudyService = {
  createGroupStudyIntoDB,
  GroupStudyDeleteFromDB,
  getAllCounsellingFromDB,
};
