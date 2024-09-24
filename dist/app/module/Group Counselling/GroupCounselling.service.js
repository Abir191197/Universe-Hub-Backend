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
const node_cron_1 = __importDefault(require("node-cron"));
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
            CreateByName: createByName,
            CreateByEmail: CreateByEmail,
            Description: EventInformation.Description,
            topic: EventInformation.topic,
            selectDate: new Date(EventInformation.selectDate),
            MeetLink: EventInformation.MeetLink,
        };
        // Create a new Group Study document in the database
        const newGroupStudy = yield GroupCounselling_model_1.default.create(data);
        // Schedule deletion of the document 1 hour after the `selectDate`
        const selectDate = new Date(EventInformation.selectDate);
        const deleteTime = new Date(selectDate.getTime() + 10 * 1000); // 1 hour after `selectDate`
        // Convert deleteTime into cron format
        const deleteCronTime = `${deleteTime.getMinutes()} ${deleteTime.getHours()} ${deleteTime.getDate()} ${deleteTime.getMonth() + 1} *`;
        // Schedule the deletion using cron
        node_cron_1.default.schedule(deleteCronTime, () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield GroupCounselling_model_1.default.findByIdAndDelete(newGroupStudy._id);
                console.log(`Group study with ID ${newGroupStudy._id} deleted successfully.`);
            }
            catch (err) {
                console.error(`Failed to delete group study with ID ${newGroupStudy._id}:`, err);
            }
        }));
        return newGroupStudy;
    }
    catch (error) {
        console.log(error);
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
        // Retrieve counseling sessions where isCompleted is false and sort by createdAt in descending order
        const result = yield GroupCounselling_model_1.default.find({ isCompleted: false }).sort({
            createdAt: -1,
        });
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to retrieve Group Study: ");
    }
});
const bookedGroupStudyIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { authUserInformation, EventInformation } = payload;
    try {
        // Check if the user exists in the database
        const isUserExist = yield users_model_1.default.findOne({
            email: authUserInformation.email,
        });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Not Found");
        }
        const { name: BookedByName, email: BookedByEmail, phone: BookedByPhone, } = isUserExist;
        // Ensure the ID from the request parameters is used to find the group study
        const isGroupStudyExist = yield GroupCounselling_model_1.default.findById(EventInformation.id); // Changed to EventInformation.id
        if (!isGroupStudyExist) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Group Study Not Found");
        }
        // Check for duplicate booking
        if (((_a = isGroupStudyExist === null || isGroupStudyExist === void 0 ? void 0 : isGroupStudyExist.BookedByEmail) === null || _a === void 0 ? void 0 : _a.includes(BookedByEmail)) ||
            ((_b = isGroupStudyExist === null || isGroupStudyExist === void 0 ? void 0 : isGroupStudyExist.BookedByName) === null || _b === void 0 ? void 0 : _b.includes(BookedByName))) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You already booked this group study");
        }
        // Add user information to the group study
        (_c = isGroupStudyExist === null || isGroupStudyExist === void 0 ? void 0 : isGroupStudyExist.BookedByEmail) === null || _c === void 0 ? void 0 : _c.push(BookedByEmail);
        (_d = isGroupStudyExist === null || isGroupStudyExist === void 0 ? void 0 : isGroupStudyExist.BookedByName) === null || _d === void 0 ? void 0 : _d.push(BookedByName);
        (_e = isGroupStudyExist === null || isGroupStudyExist === void 0 ? void 0 : isGroupStudyExist.BookedByPhone) === null || _e === void 0 ? void 0 : _e.push(BookedByPhone);
        // Ensure TotalJoin is initialized
        isGroupStudyExist.TotalJoin = (_f = isGroupStudyExist.TotalJoin) !== null && _f !== void 0 ? _f : 0; // Set to 0 if undefined
        // Now you can safely increment TotalJoin
        isGroupStudyExist.TotalJoin += 1;
        // Save the updated group study
        const result = yield isGroupStudyExist.save();
        return result;
    }
    catch (error) {
        const err = error;
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to book group study: " + err.message);
    }
});
exports.GroupStudyService = {
    createGroupStudyIntoDB,
    GroupStudyDeleteFromDB,
    getAllCounsellingFromDB,
    bookedGroupStudyIntoDB,
};
