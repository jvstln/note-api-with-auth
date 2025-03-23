import { Request, Response } from "express";

export const requestLogger = (req: Request, res: Response, next: Function) => {
  console.log(`A ${req.method} request to ${
    req.originalUrl
  } at ${new Date().toLocaleString()}
    `);
  next();
};
