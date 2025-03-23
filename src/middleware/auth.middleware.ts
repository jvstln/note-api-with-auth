import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../utils/errors";
import { verifyToken } from "../utils/utils";
import UserService from "../services/user.service";

export const handleAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.cookies.jwt;
  if (!token) throw new HTTPError(401, "Unauthenticated! User have to login");

  const validatedToken = verifyToken<{ id: string }>(token);
  if (!validatedToken) {
    throw new HTTPError(401, "Unauthenticated! Invalid token");
  }

  const user = await UserService.getUser(validatedToken.id);
  if (!user) throw new HTTPError(401, "Non existing user logged in");

  // Added global type guard in ./src/types/custom.d.ts for this to work
  req.user = { ...user, token };

  next();
};
