import UserModel from "../models/user.model";
import { type UserRegister } from "../types/user.type";
import bcrypt from "bcrypt";

class UserService {
  async getUsers() {
    return UserModel.find();
  }

  async getUser(id: string) {
    return UserModel.findById(id);
  }

  async getUserByEmail(email: string, project?: Record<string, unknown>) {
    return UserModel.findOne({ email }, project);
  }

  async createUser(user: UserRegister) {
    const hashedUser = { ...user };
    hashedUser.password = await this.hashPassword(user.password);
    return UserModel.create(hashedUser);
  }

  async updateUser(id: string, user: Partial<UserRegister>) {
    const hashedUser = { ...user };
    if (user.password) {
      hashedUser.password = await this.hashPassword(user.password);
    }
    return UserModel.findByIdAndUpdate(id, hashedUser, { new: true });
  }

  async exists(id: string) {
    return UserModel.exists({ _id: id });
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}

export default new UserService();
