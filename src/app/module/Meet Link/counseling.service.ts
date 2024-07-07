import AppError from "../../errors/AppError";
import CounselingModel from "./counseling.model";

//createCounselingDataIntoDB

const createCounselingIntoDB = async (payload: {
  authUserInformation: any;
  EventInformation: any;
}) => {
  const { authUserInformation, EventInformation } = payload;


  const createBy = authUserInformation.email;

  console.log(createBy);
  console.log(EventInformation);

  const data = {
    createBy: createBy,
    Duration: EventInformation.Duration,
    selectDate:EventInformation.selectDate,
    Type:EventInformation.Type,
    MeetLink:EventInformation.MeetLink
  };



  try {
    const EventSave = new CounselingModel(data);
    await EventSave.save();
    return EventSave.toObject();
  } catch (error) {
    console.error("Error saving event:", error);
    throw AppError; 
  }
};

export const MeetLinkServices = {
  createCounselingIntoDB,
};
