import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { HTTPError } from "../utils/errors";
import bcrypt from "bcrypt";
import { createToken } from "../utils/utils";
import { TOKEN_MAXAGE_IN_SECONDS } from "../utils/constants";

class AuthController {
  async register(req: Request, res: Response) {
    const user = await UserService.createUser(req.body);

    // Log the user in after successful registration
    const token = createToken({ id: user._id });
    res.cookie("jwt", token, {
      secure: true,
      maxAge: TOKEN_MAXAGE_IN_SECONDS * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  }

  async login(req: Request, res: Response) {
    const { email, password: incomingPassword } = req.body;
    const user = await UserService.getUserByEmail(email, {
      name: 1,
      email: 1,
      password: 1,
    });

    if (!user) throw new HTTPError(404, "User not found");

    const isPasswordValid = await bcrypt.compare(
      incomingPassword,
      user.password
    );
    if (!isPasswordValid) throw new HTTPError(401, "Invalid credentials");

    // JWT token is being stored as a cookie instead of sent in the response for additional security
    const token = createToken({ id: user._id });
    res.cookie("jwt", token, {
      secure: true,
      maxAge: TOKEN_MAXAGE_IN_SECONDS * 1000,
    });

    res.json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  }
}

export default new AuthController();
