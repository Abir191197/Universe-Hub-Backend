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
exports.courseControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const course_service_1 = require("./course.service");
//create course only admin
const CourseCreate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.courseService.createCourseIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course Create successfully",
        data: result,
    });
}));
//get course and search ,filter, sort,  pagination
const getAllCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.courseService.getAllCourserFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Courses are retrieved  succesfully",
        data: result,
    });
}));
//add course in  student profile
const addCourseInPersonalProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const authInformation = (_a = req.user) !== null && _a !== void 0 ? _a : null;
    if (authInformation === null) {
        throw new Error("Authentication information is missing.");
    }
    // Creating the payload object
    const payload = {
        id,
        authInformation,
    };
    const result = yield course_service_1.courseService.createCourseInProfileIntoDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course Added  successfully in personal Profile",
        data: result,
    });
}));
//remove course from user profile
const removeCourseFromPersonalProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const authInformation = (_a = req.user) !== null && _a !== void 0 ? _a : null;
    if (authInformation === null) {
        throw new Error("Authentication information is missing.");
    }
    const payload = {
        id,
        authInformation,
    };
    const result = yield course_service_1.courseService.removeCourseFromProfileInDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course removed successfully from personal profile",
        data: result,
    });
}));
//Get find single course from Database
const getSingleCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.courseService.getSingleCourseFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "One Course founded ",
        data: result,
    });
}));
//Course Delete From Database ONLY ADmin
const removeCourseFromDatabase = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.courseService.removeCourseFromServer(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course removed successfully from Server",
        data: result,
    });
}));
exports.courseControllers = {
    CourseCreate,
    getAllCourse,
    addCourseInPersonalProfile,
    getSingleCourse,
    removeCourseFromPersonalProfile,
    removeCourseFromDatabase,
};
