import express, { Express } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import skillsRouter from "./routes/skills.routers";
import projectRouter from "./routes/project.routers";
import blogRouter from "./routes/blog.routers";

const app: Express = express();
require("dotenv").config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/mybrand/skills", skillsRouter);
app.use("/mybrand/project", projectRouter);
app.use("/mybrand/blog", blogRouter);

// Connect to DB
mongoose
  .connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.KEY}@backend.a1mvapj.mongodb.net/${process.env.COLLECTION_NAME}?retryWrites=true&w=majority&appName=backend`
  )
  .then(() => {
    console.log("Connected to the Database");
    app.listen(process.env.PORT, () => {
      console.log("You are listening on port http://localhost:3000");
    });
  })
  .catch(() => {
    console.log("Connection fail");
  });
