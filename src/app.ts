import express, { Express, Request, Response } from "express";
import "dotenv/config";
import router from "./routes";
import cors from "cors"

const app: Express = express();
require("dotenv").config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Index route
app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .send({ message: "Welcome to RURANGWA Leo's brand API" });
});

// mybrand Apis route
app.use("/mybrand", router);

export default app;
