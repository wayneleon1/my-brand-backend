import express, { Request, Response } from "express";
import "dotenv/config";
require("dotenv").config();
const app = express();

// Middlewares

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to my backend");
});

// Connect to DB
app.listen(process.env.PORT, () => {
  console.log("You are listening on port http://localhost:3000");
});
