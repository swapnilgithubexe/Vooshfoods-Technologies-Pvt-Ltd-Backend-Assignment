import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnection } from "./config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { adminRouter } from "./src/routes/admin.routes.js";
import { artistRouter } from "./src/routes/artist.routes.js";
import { albumRouter } from "./src/routes/album.routes.js";
import { trackRouter } from "./src/routes/track.routes.js";

const app = express();

const port = process.env.PORT || 5500;

//Routes section
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/artists", artistRouter);
app.use("/api/v1/albums", albumRouter);
app.use("/api/v1/tracks", trackRouter);

app.listen(port, () => {
  dbConnection();
  console.log(`Server is up and running on port number: ${port}`);

})

