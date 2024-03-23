import express, { Express, Request, Response } from "express";
import "dotenv/config";
import skillsRouter from "./routes/skills.routers";
import projectRouter from "./routes/project.routers";
import blogRouter from "./routes/blog.routers";
import userRouter from "./routes/users.routers";

import BlogCommentRouter from "./routes/blogComment.routers";
import queriesRouter from "./routes/queries.routers";

const app: Express = express();
require("dotenv").config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .send({ message: "Welcome to RURANGWA Leo's brand API" });
});

app.use("/mybrand/skills", skillsRouter);
app.use("/mybrand/project", projectRouter);
app.use("/mybrand/blog", blogRouter);
app.use("/mybrand/user", userRouter);
app.use("/mybrand/queries", queriesRouter);
app.use("/mybrand/blogComment", BlogCommentRouter);

export default app;
