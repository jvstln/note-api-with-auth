import express from "express";
import { createValidationMiddleware } from "../middleware/validation.middleware";
import { userSchema } from "../schemas/user.schema";
import AuthController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post(
  "/register",
  createValidationMiddleware(userSchema),
  AuthController.register
);
authRouter.post("/login", AuthController.login);

export default authRouter;
