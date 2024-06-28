import { USER_ROLE } from "./user.constant";

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin" | "counsellor" | "student";
}

export type TUserRole = keyof typeof USER_ROLE;
