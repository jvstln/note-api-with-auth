import { Response } from "express";

export class HTTPError extends Error {
  code: number;
  error: unknown;

  constructor(code: number, message: string, error?: unknown) {
    super(message);
    this.code = code;
    this.error = error;
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
