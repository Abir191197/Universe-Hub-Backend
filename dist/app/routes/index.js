"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../module/auth/auth.route");
const course_route_1 = require("../module/courses/course.route");
const file_route_1 = require("../module/File/file.route");
const counseling_route_1 = require("../module/One To One Counselling/counseling.route");
const payment_route_1 = require("../module/Payment/payment.route");
const users_route_1 = require("../module/users/users.route");
const GroupCounselling_route_1 = require("../module/Group Counselling/GroupCounselling.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: users_route_1.UserRoutes,
    },
    {
        path: "/courses",
        route: course_route_1.CourseRoutes,
    },
    {
        path: "/files-Upload",
        route: file_route_1.fileRoutes,
    },
    {
        path: "/Counseling",
        route: counseling_route_1.CounsellingRoute,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: "/GroupCounselling",
        route: GroupCounselling_route_1.GroupCounsellingRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route)); // This will automatically loop your routes that you will add in the moduleRoutes array
exports.default = router;
