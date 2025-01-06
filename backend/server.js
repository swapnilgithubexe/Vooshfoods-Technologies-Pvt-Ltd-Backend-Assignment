import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnection } from "./config/database.js";
import { userRouter } from "./src/routes/user.routes.js";

const app = express();

const port = process.env.PORT || 5500;

//Routes section
app.use(express.json());
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  dbConnection();
  console.log(`Server is up and running on port number: ${port}`);

})

