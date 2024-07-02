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
//find one user into DB
const findUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (payload !== null) {
            const result = yield users_model_1.default.findOne({
                email: payload.email,
            }).select("-password");
            return result;
        }
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to Get User");
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
        if (isUserExist.role === "counsellor") {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already counsellor role");
        }
        isUserExist.role = "counsellor";
        yield isUserExist.save();
        return isUserExist;
    }
    catch (error) {
        throw error;
    }
});
exports.UserService = {
    findUserFromDB,
    updatedUserIntoDB,
    updatedRoleIntoDB
};
