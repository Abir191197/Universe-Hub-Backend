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
exports.paymentServices = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const counseling_model_1 = __importDefault(require("../One To One Counselling/counseling.model"));
const SmsSend_1 = require("../One To One Counselling/SmsSend");
const payment_utils_1 = require("./payment.utils");
const confirmationService = (bookingId, status) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Booking ID: ${bookingId}`);
    console.log(`Status: ${status}`);
    try {
        // Verify the payment status using the transaction/order ID
        const verifyResponse = yield (0, payment_utils_1.verifyPayment)(bookingId);
        console.log(`Verify Response: ${JSON.stringify(verifyResponse)}`);
        let statusMessage;
        let templateFile;
        if (status === "success" && verifyResponse.pay_status === "Successful") {
            statusMessage = "Payment successful";
            templateFile = "ConfirmationSuccess.html";
            // Update the payment status in the database
            const booking = yield counseling_model_1.default.findByIdAndUpdate(bookingId, { isPayment: true }, { new: true } // Return the updated document
            ).exec();
            if (booking) {
                // Send SMS confirmation after booking is confirmed
                try {
                    const messageData = {
                        CounsellorName: booking.CreateBy,
                        BookingName: booking.BookedByName,
                        MeetLink: booking.MeetLink,
                        RoomNumber: booking.StudyRoomNumber,
                        selectDate: booking.selectDate,
                    };
                    console.log(messageData);
                    yield (0, SmsSend_1.sendSmsToUser)(booking.BookedByPhone, messageData);
                }
                catch (error) {
                    console.error("Failed to send SMS:", error);
                }
            }
            else {
                throw new Error("Booking not found after payment confirmation");
            }
        }
        else if (verifyResponse.pay_status === "Failed") {
            statusMessage = "Payment failed";
            templateFile = "ConfirmationFailure.html";
            // Update the payment status in the database
            yield counseling_model_1.default.findByIdAndUpdate(bookingId, {
                isPayment: false,
                isBooked: false,
                BookedBy: null,
                BookedByName: null,
                BookedByPhone: null,
                BookedByEmail: null,
            }).exec();
        }
        else {
            throw new Error("Unexpected payment status or response");
        }
        // Read and modify the HTML template
        const filePath = (0, path_1.join)(__dirname, `../../../views/${templateFile}`);
        let template;
        try {
            template = (0, fs_1.readFileSync)(filePath, "utf-8");
        }
        catch (fileError) {
            console.error("Error reading template file:", fileError);
            throw new Error("Template file not found");
        }
        // Replace placeholder in the template
        template = template.replace("{{message}}", statusMessage);
        return template;
    }
    catch (error) {
        console.error("Error in confirmationService:", error);
        throw new Error("Failed to confirm payment");
    }
});
exports.paymentServices = {
    confirmationService,
};
