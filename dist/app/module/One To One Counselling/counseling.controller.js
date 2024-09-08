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
exports.CounselingControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const counseling_service_1 = require("./counseling.service");
// create Event Full link into DB
const createCounseling = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        authUserInformation: req.user,
        EventInformation: req.body,
    };
    const result = yield counseling_service_1.CounselingServices.createCounselingIntoDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Counseling Event Create successfully",
        data: result,
    });
}));
//get Event Full link from DB
const getAllEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield counseling_service_1.CounselingServices.getCounsellingFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event are retrieved  succesfully",
        data: result,
    });
}));
//get event by who have owner
const getCounsellingByWhoOwner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        authUserInformation: req.user,
    };
    const result = yield counseling_service_1.CounselingServices.getOwnerCounsellingFromDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event are retrieved for owner  succesfully",
        data: result,
    });
}));
//Booking by Student
const BookedEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    // Handle the case where user is undefined
    if (!user) {
        return res.status(http_status_1.default.UNAUTHORIZED).json({
            status: "error",
            message: "Authentication information is missing.",
        });
    }
    // Call the function with the correct argument order
    const result = yield counseling_service_1.CounselingServices.EventBookingConfirmIntoDB(id, user);
    // Send success response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event booked successfully",
        data: result,
    });
}));
//delete counselling controller
const deleteCounselling = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield counseling_service_1.CounselingServices.EventDeleteFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event deleted successfully",
        data: result,
    });
}));
// Controller to handle the request
const CompleteCounselling = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield counseling_service_1.CounselingServices.CompleteCounsellingUpdatedIntoBD(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Counseling session marked as completed successfully",
        data: result,
    });
}));
exports.CounselingControllers = {
    createCounseling,
    getAllEvent,
    BookedEvent,
    getCounsellingByWhoOwner,
    deleteCounselling,
    CompleteCounselling,
};
