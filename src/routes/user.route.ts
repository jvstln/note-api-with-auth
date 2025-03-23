import express from "express";
import UserController from "../controllers/user.controller";
import { createValidationMiddleware } from "../middleware/validation.middleware";
import { optionalUserSchema, userSchema } from "../schemas/user.schema";

const userRouter = express.Router();

userRouter.param("userId", UserController.validateUserId);

userRouter.get("/", UserController.getUsers);
userRouter.get("/:userId", UserController.getUser);
userRouter.post(
  "/",
  createValidationMiddleware(userSchema),
  UserController.hashPassword,
  UserController.createUser
);
userRouter.patch(
  "/:userId",
  createValidationMiddleware(optionalUserSchema),
  UserController.hashPassword,
  UserController.updateUser
);

export default userRouter;
