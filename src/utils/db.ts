import mongoose from "mongoose";

export const connectToDatabase = async (databaseUrl: string) => {
  console.log("Connecting to database...");
  const res = await mongoose.connect(databaseUrl);
  console.log("Connected to database successfully");
};
