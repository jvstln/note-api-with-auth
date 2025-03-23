import { UserDetails } from "./user.type";

// Declaration of user type guard
declare module "express" {
  interface Request {
    user?: UserDetails;
  }
}
