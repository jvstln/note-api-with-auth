import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TOKEN_MAXAGE_IN_SECONDS } from "./constants";

dotenv.config();

export const createObjectPath = (
  object: Record<string, unknown>,
  path: string,
  value: unknown
) => {
  const paths = path.split(".");

  const getNextValue = (nextPath: string | undefined) =>
    !nextPath
      ? value
      : Number.isInteger(+nextPath) && parseInt(nextPath) >= 0
      ? []
      : {};

  let currentObject = object;

  paths.forEach((key, index) => {
    if (!currentObject[key]) {
      currentObject[key] = getNextValue(paths[index + 1]);
    }

    currentObject = currentObject[key] as Record<string, unknown>;
  });
};

export const createToken = (payload: Parameters<typeof jwt.sign>[0]) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "SECRET KEY", {
    expiresIn: TOKEN_MAXAGE_IN_SECONDS,
  });
};

export const verifyToken = <T>(token: string): T => {
  return jwt.verify(token, process.env.JWT_SECRET || "SECRET KEY") as T;
};
