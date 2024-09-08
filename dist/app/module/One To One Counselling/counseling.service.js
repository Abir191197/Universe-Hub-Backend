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
exports.CounselingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const payment_utils_1 = require("../Payment/payment.utils");
const users_model_1 = __importDefault(require("../users/users.model"));
const counseling_model_1 = __importDefault(require("./counseling.model"));
//createCounselingDataIntoDB
const createCounselingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
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
            Duration: EventInformation.Duration,
            imgSrc: EventInformation.imgSrc,
            CashAmount: EventInformation.CashAmount, // Default to 0 if undefined
            selectDate: new Date(EventInformation.selectDate), // Convert string to 
            Type: EventInformation.Type,
            MeetLink: EventInformation.MeetLink,
            StudyRoomNumber: EventInformation.StudyRoomNumber,
        };
        // Create a new counseling session in the database
        const newCounseling = yield counseling_model_1.default.create(data);
        return newCounseling;
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            throw error;
        }
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "An error occurred while creating the booking");
    }
});
//get ALl Event From DB and sent it  Controllers
const getCounsellingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve counseling sessions where isCompleted is false
        const result = yield counseling_model_1.default.find({ isCompleted: false });
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to retrieve Counseling");
    }
});
//get one user counselling data
const getOwnerCounsellingFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { authUserInformation } = payload;
    try {
        // Check if the user exists in the database
        const isUserExist = yield users_model_1.default.findOne({
            email: authUserInformation.email,
        });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Not Found");
        }
        const counsellingData = yield counseling_model_1.default.find({
            $or: [
                { CreateByEmail: authUserInformation.email },
                { BookedByEmail: authUserInformation.email },
            ],
        });
        // Return the counselling data
        return counsellingData;
    }
    catch (error) {
        console.error('Error in getOwnerCounsellingFromDB:', error); // Logging the error for debugging
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to retrieve Counselling");
    }
});
//booked
const EventBookingConfirmIntoDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let result;
    try {
        session.startTransaction();
        // Fetch the booking record
        const booking = yield counseling_model_1.default.findById(id).session(session).exec();
        if (!booking) {
            throw new AppError_1.default(404, "Booking not found");
        }
        if (booking.isBooked) {
            throw new AppError_1.default(400, "Booking is already confirmed");
        }
        // Fetch the user
        const isUserExist = yield users_model_1.default.findOne({ email: user.email })
            .session(session)
            .exec();
        if (!isUserExist) {
            throw new AppError_1.default(404, "User not found");
        }
        // Update booking status
        booking.isBooked = true;
        booking.BookedBy = isUserExist._id;
        booking.BookedByName = isUserExist.name;
        booking.BookedByEmail = isUserExist.email;
        booking.BookedByPhone = isUserExist.phone;
        if (booking.CashAmount !== undefined && booking.CashAmount > 0) {
            // If payment is required, set isPayment to false initially
            booking.isPayment = false;
            // Prepare payment data
            const paymentData = {
                id,
                amount: booking.CashAmount,
                UserName: isUserExist.name,
                UserEmail: isUserExist.email,
                UserPhone: isUserExist.phone,
                UserAddress: isUserExist.address,
            };
            let paymentSession;
            try {
                paymentSession = yield (0, payment_utils_1.sendPaymentRequest)(paymentData);
            }
            catch (error) {
                console.error("Failed to create payment session:", error);
                yield session.abortTransaction();
                throw new AppError_1.default(500, "Failed to initiate payment session.");
            }
            // Save booking after initiating payment
            yield booking.save({ session });
            yield session.commitTransaction();
            result = paymentSession;
        }
        else {
            // If cash amount is 0, confirm booking directly
            booking.isPayment = true;
            yield booking.save({ session });
            yield session.commitTransaction();
            result = { message: "Booking confirmed successfully" };
        }
    }
    catch (error) {
        yield session.abortTransaction();
        throw error; // Let the error propagate up
    }
    finally {
        session.endSession();
    }
    return result;
});
//Event DELETE
const EventDeleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete counseling session by id
        const result = yield counseling_model_1.default.findByIdAndDelete(id);
        if (!result) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Counseling session not found");
        }
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete Counseling");
    }
});
//Event Complete
const CompleteCounsellingUpdatedIntoBD = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Mark the counseling session as completed
        const result = yield counseling_model_1.default.findByIdAndUpdate(id, // First argument is the ID
        { isCompleted: true }, // Second argument is the update object
        { new: true } // Returns the updated document
        );
        if (!result) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Counseling session not found");
        }
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update Counseling session");
    }
});
exports.CounselingServices = {
    createCounselingIntoDB,
    getCounsellingFromDB,
    EventBookingConfirmIntoDB,
    getOwnerCounsellingFromDB,
    EventDeleteFromDB,
    CompleteCounsellingUpdatedIntoBD,
};
