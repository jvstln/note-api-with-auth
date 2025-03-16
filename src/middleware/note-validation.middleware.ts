import { Request, Response } from "express";
import { handleError, HTTPError } from "../utils/errors";

export const validateNote = (req: Request, res: Response, next: Function) => {
  const { title } = req.body;

  try {
    if (!title) throw new HTTPError(400, "Title is required");
    if (title.length < 3 || title.length > 75) {
      throw new HTTPError(400, "Title should be between 2 and 75 characters");
    }

    next();
  } catch (error) {
    handleError(res, error, "Error validating note");
  }
};

export const validatePartialNote = (
  req: Request,
  res: Response,
  next: Function
) => {
  const { title } = req.body;

  try {
    if (title !== undefined && (title.length < 3 || title.length > 75)) {
      throw new HTTPError(400, "Title should be between 2 and 75 characters");
    }

    next();
  } catch (error) {
    handleError(res, error, "Error validating note");
  }
};
