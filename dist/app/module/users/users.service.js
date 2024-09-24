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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const users_model_1 = __importDefault(require("./users.model"));
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const courses_constant_1 = require("../courses/courses.constant");
//find one user into DB
const findUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if payload is not null
        if (payload !== null) {
            // Find user by email
            const result = yield users_model_1.default.findOne({
                email: payload.email,
            })
                .select("-password") // Exclude password field from results
                .populate("courses"); // Populate courses field
            // Check if user is found
            if (!result) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
            }
            // Check if user status is 'Suspended'
            if (result.status === "Suspended") {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User account is suspended");
            }
            // Return the user data
            return result;
        }
        // Handle case where payload is null
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid token payload");
    }
    catch (error) {
        // Handle and throw errors
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to get user");
    }
});
//Updated User Into DB
const updatedUserIntoDB = (payload, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (payload !== null) {
            const updatedUser = yield users_model_1.default.findOneAndUpdate({ email: payload.email }, { $set: updateData }, { new: true, runValidators: true }).select("-password"); // Exclude the password field from the result
            if (!updatedUser) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
            }
            return updatedUser;
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid payload");
        }
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update user");
    }
});
//updated  role student into DB
const updatedRoleIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUserExist = yield users_model_1.default.findOne({ _id: id });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        if (isUserExist.role === "admin") {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already admin role");
        }
        isUserExist.role = "admin";
        yield isUserExist.save();
        return isUserExist;
    }
    catch (error) {
        throw error;
    }
});
const BanIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the user exists
        const isUserExist = yield users_model_1.default.findById(id);
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        // Check if the user is already suspended
        if (isUserExist.status === "Suspended") {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is already suspended");
        }
        // Update the user's status to 'Suspended'
        isUserExist.status = "Suspended";
        // Save the changes to the database
        yield isUserExist.save();
        // Return the updated user information
        return isUserExist;
    }
    catch (error) {
        // If it's an AppError, rethrow it, otherwise wrap it in a new AppError
        if (error instanceof AppError_1.default) {
            throw error;
        }
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to suspend user");
    }
});
//active the user
const ActiveUserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the user exists
        const isUserExist = yield users_model_1.default.findById(id);
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        // Check if the user is already active
        if (isUserExist.status === "Active") {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is already active");
        }
        // Update the user's status to 'Active'
        isUserExist.status = "Active";
        // Save the changes to the database
        yield isUserExist.save();
        // Return the updated user information
        return isUserExist;
    }
    catch (error) {
        // If it's an AppError, rethrow it, otherwise wrap it in a new AppError
        if (error instanceof AppError_1.default) {
            throw error;
        }
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to activate user");
    }
});
//get All USer
const GetAllUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Prepare the query object for users
        const queryObj = Object.assign({}, query);
        // Use the QueryBuilder to build the user query
        const userQuery = new QueryBuilder_1.default(users_model_1.default.find(), queryObj)
            .search(courses_constant_1.userSearchableFields); // Assuming userSearchableFields is defined
        // Fetch all users from the database
        const result = yield userQuery.modelQuery;
        return result;
    }
    catch (error) {
        // Throw a custom error if something goes wrong
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to get all users");
    }
});
exports.UserService = {
    findUserFromDB,
    updatedUserIntoDB,
    updatedRoleIntoDB,
    GetAllUserFromDB,
    BanIntoDB,
    ActiveUserIntoDB,
};
