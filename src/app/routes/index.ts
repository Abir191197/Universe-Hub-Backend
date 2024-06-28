import { Router } from 'express';
import { UserRoutes } from '../module/users/users';



const router = Router();

const moduleRoutes = [
  {
    path: "NA",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));  // This will automatically loop your routes that you will add in the moduleRoutes array

export default router;