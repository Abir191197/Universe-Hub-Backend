import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TUserRole } from "../module/users/users.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";

const authVerify = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    const tokenSplit = token?.split(" ");
    try {
      // Verify token
      const decoded = jwt.verify(
        tokenSplit[1],
        config.access_key as string
      ) as JwtPayload;

      // Assign decoded payload to request object
      req.user = decoded;

      // Role checking
      const role = (decoded as JwtPayload).role;
      if (requiredRoles.length === 0 || requiredRoles.includes(role)) {
        return next();
      }

      // Unauthorized if user's role doesn't match required roles
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You do not have permission to access this resource"
      );
    } catch (error) {
      // Handle token verification errors
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
    }
  });
};

export default authVerify;
