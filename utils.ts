import mongoose from "mongoose";

export const connectToDatabase = async (databaseUrl: string) => {
  console.log("Connecting to database...");
  const res = await mongoose.connect(databaseUrl);
  console.log("Connected to database successfully", res);
};

export class HTTPError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}
