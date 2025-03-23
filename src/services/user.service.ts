import UserModel from "../models/user.model";
import { UserRegister } from "../types/user.type";

class UserService {
  async getUsers() {
    return UserModel.find();
  }

  async getUser(id: string) {
    return UserModel.findById(id);
  }

  async getUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async createUser(user: UserRegister) {
    return UserModel.create(user);
  }

  async updateUser(id: string, user: Partial<UserRegister>) {
    return UserModel.findByIdAndUpdate(id, user, { new: true });
  }

  async exists(id: string) {
    return UserModel.exists({ _id: id });
  }
}

export default new UserService();
