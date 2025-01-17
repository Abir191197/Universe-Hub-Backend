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
exports.fileUploadController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const file_service_1 = require("./file.service");
//file upload
const fileUpload = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        fileInformation: req.file,
        authUserInformation: req.user,
        typeInformation: req.body,
    };
    const result = yield file_service_1.fileUploadService.createFileUploadIntoDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "File uploaded successfully",
        data: result,
    });
}));
//get file for course
// Controller to handle request for getting all files for a course
const getAllFileForOneCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extracting the course ID from the request parameters
    const { id } = req.params;
    const result = yield file_service_1.fileUploadService.getAllFilesForCourse(id);
    // Send a successful response with the result data
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Files retrieved successfully',
        data: result,
    });
}));
const getAllFileForAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield file_service_1.fileUploadService.getAllFileDetailsFromDB();
    // Send a successful response with the result data
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Files retrieved successfully",
        data: result,
    });
}));
//file approved
const fileApproved = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield file_service_1.fileUploadService.fileStatusChangeIntoDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "File Approved successfully",
        data: result,
    });
}));
const fileDelete = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield file_service_1.fileUploadService.FileDeleteFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "File Delete successfully",
        data: result,
    });
}));
exports.fileUploadController = {
    fileUpload,
    fileApproved,
    getAllFileForOneCourses,
    getAllFileForAdmin,
    fileDelete,
};
