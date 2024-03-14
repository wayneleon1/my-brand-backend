import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
require("dotenv").config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to my backend");
});

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
