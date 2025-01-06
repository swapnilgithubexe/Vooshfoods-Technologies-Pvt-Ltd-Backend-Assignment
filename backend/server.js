import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnection } from "./config/database.js";

const app = express();

const port = process.env.PORT || 5500;

app.listen(port, () => {
  dbConnection();
  console.log(`Server is up and running on port number: ${port}`);

})

