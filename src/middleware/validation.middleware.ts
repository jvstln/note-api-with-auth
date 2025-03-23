import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../utils/errors";
import Joi from "joi";
import { createObjectPath } from "../utils/utils";

export const createValidationMiddleware = <T>(schema: Joi.ObjectSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      throw new HTTPError(400, "Validation error", formatJoiError(error));
    }

    req.body = value;
    next();
  };
};

const formatJoiError = (error: Joi.ValidationError | undefined) => {
  if (!error) return undefined;

  return error.details.reduce((acc, curr) => {
    createObjectPath(acc, curr.path.join("."), curr.message);
    return acc;
  }, {});
};
