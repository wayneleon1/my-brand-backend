import express, { Router, Express } from "express";
const router: Router = express.Router();

import skillsRouter from "./skills.routers";
import projectRouter from "./project.routers";
import blogRouter from "./blog.routers";
import userRouter from "./users.routers";
import BlogCommentRouter from "./blogComment.routers";
import queriesRouter from "./queries.routers";

router.use("/skills", skillsRouter);
router.use("/project", projectRouter);
router.use("/blog", blogRouter);
router.use("/user", userRouter);
router.use("/queries", queriesRouter);
router.use("/blogComment", BlogCommentRouter);

export default router;
