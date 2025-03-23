import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { HTTPError } from "../utils/errors";

class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await UserService.getUsers();
    res.json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  }

  async getUser(req: Request, res: Response) {
    const user = await UserService.getUser(req.params.userId);

    res.json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  }

  async createUser(req: Request, res: Response) {
    const user = await UserService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  }

  async updateUser(req: Request, res: Response) {
    const user = await UserService.updateUser(req.params.userId, req.body);
    res.json({
      success: true,
      message: "User details updated successfully",
      data: user,
    });
  }

  async validateUserId(
    req: Request,
    res: Response,
    next: NextFunction,
    userId: unknown
  ) {
    if (typeof userId !== "string" || userId.length !== 24) {
      throw new HTTPError(400, "Invalid user id");
    }

    const userExists = await UserService.exists(userId);
    if (!userExists) {
      throw new HTTPError(404, "User not found");
    }

    next();
  }
}

export default new UserController();
