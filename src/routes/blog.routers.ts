import express, { Router } from "express";
const router: Router = express.Router();
import validateToken from "../middleware/validateTokenHandler";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controllers";
import fileUpload from "../helper/multer";

router
  .route("/")
  .get(getBlogs)
  .post(validateToken, fileUpload.single("image"), createBlog);
router
  .route("/:id")
  .get(getBlogById)
  .put(validateToken, updateBlog)
  .delete(validateToken, deleteBlog);

export default router;
