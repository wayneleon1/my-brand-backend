import express, { Router } from "express";
const router: Router = express.Router();
import validateToken from "../middleware/validateTokenHandler";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/blogComment.controllers";

router.post("/:blog_id/comments/create", createComment);
router.get("/", getComments);
router.delete("/:id/comment/delete", validateToken, deleteComment);

export default router;
