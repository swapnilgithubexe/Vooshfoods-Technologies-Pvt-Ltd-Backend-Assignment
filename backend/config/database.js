import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

export const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Database connected successfully.");

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

