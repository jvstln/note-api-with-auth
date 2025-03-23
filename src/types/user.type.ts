import { Types } from "mongoose";

export interface User {
  _id: string | Types.ObjectId;
  email: string;
  password: string;
  name: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  name: string;
}

export interface UserDetails extends User {
  token: string;
}
