"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupStudyService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const users_model_1 = __importDefault(require("../users/users.model"));
const GroupCounselling_model_1 = __importDefault(require("./GroupCounselling.model"));
const createGroupStudyIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { authUserInformation, EventInformation } = payload;
    try {
        // Check if the user exists in the database
        const isUserExist = yield users_model_1.default.findOne({
            email: authUserInformation.email,
        });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Not Found");
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
        const newGroupStudy = yield GroupCounselling_model_1.default.create(data);
        return newGroupStudy;
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            throw error;
        }
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "An error occurred while creating the GroupStudy");
    }
});
//Event DELETE
const GroupStudyDeleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete counseling session by id
        const result = yield GroupCounselling_model_1.default.findByIdAndDelete(id);
        if (!result) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Group Study not found");
        }
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete Group Study");
    }
});
//get ALl Group Study From DB and sent it  Controllers
const getAllCounsellingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve counseling sessions where isCompleted is false
        const result = yield GroupCounselling_model_1.default.find({ isCompleted: false });
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to retrieve Group Study");
    }
});
exports.GroupStudyService = {
    createGroupStudyIntoDB,
    GroupStudyDeleteFromDB,
    getAllCounsellingFromDB,
};
