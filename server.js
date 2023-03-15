import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { courseRouter } from "./routes/courseRoute.js";
import { subscriberRouter } from "./routes/subscriberRoute.js";
import { userRouter } from "./routes/userRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

main().catch((err) => console.log(err));
async function main() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("successfuly connect database");
    })
    .catch((error) => {
      console.log("database connection failed");
      console.error(error);
    });
}

app.use(express.urlencoded({ extended: true }));

app.use("/api/courses", courseRouter);
app.use("/api/subscribers", subscriberRouter);
app.use("/api/users", userRouter)


const port = process.env.PORT;

app.listen(port, () => console.log("application is running on port : " + port));
