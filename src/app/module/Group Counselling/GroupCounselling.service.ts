import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import UserModel from "../users/users.model";
import GroupStudyModel from "./GroupCounselling.model";
import cron from "node-cron";
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
      CreateByName: createByName,
      CreateByEmail: CreateByEmail,
      Description: EventInformation.Description,
      topic: EventInformation.topic,
      selectDate: new Date(EventInformation.selectDate),
      MeetLink: EventInformation.MeetLink,
    };

    // Create a new Group Study document in the database
    const newGroupStudy = await GroupStudyModel.create(data);

    // Schedule deletion of the document 1 hour after the `selectDate`
    const selectDate = new Date(EventInformation.selectDate);
    const deleteTime = new Date(selectDate.getTime() +  10 * 1000); // 1 hour after `selectDate`

    // Convert deleteTime into cron format
    const deleteCronTime = `${deleteTime.getMinutes()} ${deleteTime.getHours()} ${deleteTime.getDate()} ${deleteTime.getMonth() + 1} *`;

    // Schedule the deletion using cron
    cron.schedule(deleteCronTime, async () => {
      try {
        await GroupStudyModel.findByIdAndDelete(newGroupStudy._id);
        console.log(
          `Group study with ID ${newGroupStudy._id} deleted successfully.`
        );
      } catch (err) {
        console.error(
          `Failed to delete group study with ID ${newGroupStudy._id}:`,
          err
        );
      }
    });

    return newGroupStudy;
  } catch (error) {
    console.log(error);
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
    // Retrieve counseling sessions where isCompleted is false and sort by createdAt in descending order
    const result = await GroupStudyModel.find({ isCompleted: false }).sort({
      createdAt: -1,
    });

    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to retrieve Group Study: "
    );
  }
};

const bookedGroupStudyIntoDB = async (payload: { authUserInformation: any; EventInformation: any; }) => {
  const { authUserInformation, EventInformation } = payload;

  try {
    // Check if the user exists in the database
    const isUserExist = await UserModel.findOne({
      email: authUserInformation.email,
    });

    if (!isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User Not Found");
    }

    const {
      name: BookedByName,
      email: BookedByEmail,
      phone: BookedByPhone,
    } = isUserExist;

    // Ensure the ID from the request parameters is used to find the group study
    const isGroupStudyExist = await GroupStudyModel.findById(
      EventInformation.id
    ); // Changed to EventInformation.id
    if (!isGroupStudyExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "Group Study Not Found");
    }

    // Check for duplicate booking
    if (
      isGroupStudyExist?.BookedByEmail?.includes(BookedByEmail) ||
      isGroupStudyExist?.BookedByName?.includes(BookedByName)
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You already booked this group study"
      );
    }

    // Add user information to the group study
    isGroupStudyExist?.BookedByEmail?.push(BookedByEmail);
    isGroupStudyExist?.BookedByName?.push(BookedByName);
    isGroupStudyExist?.BookedByPhone?.push(BookedByPhone);

    // Ensure TotalJoin is initialized
    isGroupStudyExist.TotalJoin = isGroupStudyExist.TotalJoin ?? 0; // Set to 0 if undefined

    // Now you can safely increment TotalJoin
    isGroupStudyExist.TotalJoin += 1;
    // Save the updated group study
    const result = await isGroupStudyExist.save();

    return result;
  } catch (error) {
    const err = error as Error;
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to book group study: " + err.message
    );
  }
};

export const GroupStudyService = {
  createGroupStudyIntoDB,
  GroupStudyDeleteFromDB,
  getAllCounsellingFromDB,
  bookedGroupStudyIntoDB,
};
