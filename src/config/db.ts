import mongoose from "mongoose";
import { config } from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};
