import { ErrorRequestHandler } from "express";
import { HTTPError } from "../utils/errors";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.message, "caught like a pro");

  if (err instanceof HTTPError) {
    res.status(err.code || 500).json({
      message: err.message,
      success: false,
      error: err.error,
    });
  }

  res.status(500).json({
    message: err.message || "Internal server error",
    success: false,
  });

  next();
};
