import express from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/users/users.route";
import { CourseRoutes } from "../module/courses/course.route";
import { fileRoutes } from "../module/File/file.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/courses",
    route:CourseRoutes,
  },
  {
    path: "/files-Upload",
    route:fileRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route)); // This will automatically loop your routes that you will add in the moduleRoutes array

export default router;
