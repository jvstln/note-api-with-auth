import { Response } from "express";
import mongoose from "mongoose";

export const connectToDatabase = async (databaseUrl: string) => {
  console.log("Connecting to database...");
  const res = await mongoose.connect(databaseUrl);
  console.log("Connected to database successfully");
};

export class HTTPError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export const handleError = (
  res: Response,
  error: unknown,
  defaultError?: string
) => {
  const errorCode = error instanceof HTTPError ? error.code : 500;
  const message = error instanceof Error ? error.message : defaultError;

  res.status(errorCode).json({
    message,
    success: false,
  });
};

export const handleSuccess = (
  res: Response,
  message: string,
  data?: unknown
) => {
  res.json({ message, data, success: true });
};
