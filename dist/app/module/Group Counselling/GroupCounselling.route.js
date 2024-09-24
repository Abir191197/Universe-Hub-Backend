"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupCounsellingRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const user_constant_1 = require("../users/user.constant");
const GroupCounselling_validation_1 = require("./GroupCounselling.validation");
const GroupCounselling_controller_1 = require("./GroupCounselling.controller");
const router = express_1.default.Router();
//create Counselling
router.post("/createGroupCounselling", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.counsellor, user_constant_1.USER_ROLE.student), (0, validateRequest_1.default)(GroupCounselling_validation_1.GroupStudyValidation.GroupStudyValidationSchema), GroupCounselling_controller_1.GroupStudyController.createGroupStudy);
router.delete("/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.counsellor, user_constant_1.USER_ROLE.student), GroupCounselling_controller_1.GroupStudyController.deleteGroupStudy);
router.get("/", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.counsellor, user_constant_1.USER_ROLE.student), GroupCounselling_controller_1.GroupStudyController.getAllGroupStudy);
router.put("/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.counsellor, user_constant_1.USER_ROLE.student), GroupCounselling_controller_1.GroupStudyController.bookedGroupStudy);
exports.GroupCounsellingRoute = router;
