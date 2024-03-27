import express, { Router } from "express";
const router: Router = express.Router();
import fileUpload from "../helper/multer";
import validateToken from "../middleware/validateTokenHandler";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/blogComment.controllers";

router.post(
  "/:blog_id/comment/create",
  fileUpload.single("file"),
  createComment
);
router.get("/", getComments);
router.delete("/:id/comment/delete", validateToken, deleteComment);

export default router;
