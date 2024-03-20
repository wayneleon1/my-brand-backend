import express, { Express } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import skillsRouter from "./routes/skills.routers";
import projectRouter from "./routes/project.routers";
import blogRouter from "./routes/blog.routers";
import userRouter from "./routes/users.routers";
import { connectToDatabase } from "./config/dbConnection";
import BlogCommentRouter from "./routes/blogComment.routers";

//connect to the database
connectToDatabase();
const app: Express = express();
require("dotenv").config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/mybrand/skills", skillsRouter);
app.use("/mybrand/project", projectRouter);
app.use("/mybrand/blog", blogRouter);
app.use("/mybrand/user", userRouter);
app.use("/mybrand/blogComment", BlogCommentRouter);

// listening to the port
app.listen(process.env.PORT, () => {
  console.log("You are listening on port http://localhost:3000");
});
