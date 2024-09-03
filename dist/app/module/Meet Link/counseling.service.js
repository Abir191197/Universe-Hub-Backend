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
        // Prepare data for insertion
        const data = {
            CreateBy: createByName,
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
        const result = yield counseling_model_1.default.find();
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to retrieved Counseling");
    }
});
//Booked Counselling by student
const EventBookingConfirmIntoDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    // Start a session
    const session = yield mongoose_1.default.startSession();
    try {
        // Start transaction
        session.startTransaction();
        // Check if the booking exists
        const booking = yield counseling_model_1.default.findById(id).session(session).exec();
        if (!booking) {
            throw new AppError_1.default(404, "Booking not found");
        }
        // Check if the booking is already confirmed or booked
        if (booking.isBooked) {
            throw new AppError_1.default(400, "Booking is already confirmed");
        }
        // Check if the user exists
        const isUserExist = yield users_model_1.default.findOne({ email: user.email })
            .session(session)
            .exec();
        if (!isUserExist) {
            throw new AppError_1.default(404, "User not found");
        }
        // Prepare payment data
        const paymentData = {
            id,
            CashAmount: booking.CashAmount,
            UserName: isUserExist.name,
            UserEmail: isUserExist.email,
            UserPhone: isUserExist.phone,
            UserAddress: isUserExist.address,
        };
        // Initiate payment session
        let paymentSession;
        try {
            paymentSession = yield (0, payment_utils_1.sendPaymentRequest)(paymentData);
        }
        catch (error) {
            console.error("Failed to create payment session:", error);
            yield session.abortTransaction(); // Rollback transaction
            throw new AppError_1.default(500, "Failed to initiate payment session.");
        }
        // Update the booking status
        booking.isBooked = true;
        booking.BookedBy = isUserExist._id; // Assuming the user ID is used
        booking.BookedByName = isUserExist.name;
        booking.BookedByPhone = isUserExist.phone;
        yield booking.save({ session });
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        // Return the payment session to the frontend
        return paymentSession;
    }
    catch (error) {
        // Abort the transaction in case of error
        yield session.abortTransaction();
        session.endSession();
        // Ensure AppError instances are properly thrown
        if (error instanceof AppError_1.default) {
            throw error;
        }
        else {
            // Convert non-AppError errors to AppError
            throw new AppError_1.default(500, "Internal server error");
        }
    }
});
exports.CounselingServices = {
    createCounselingIntoDB,
    getCounsellingFromDB,
    EventBookingConfirmIntoDB,
};
