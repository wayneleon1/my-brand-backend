import express, { Router } from "express";
const router: Router = express.Router();
import validateToken from "../middleware/validateTokenHandler";
import { createComment } from "../controllers/blogComment.controllers";



router.post("/:blog_id/comments/create", createComment);

export default router;
