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

router.route("/").get(getBlogs).post(validateToken, createBlog);
router
  .route("/:id")
  .get(getBlogById)
  .put(validateToken, updateBlog)
  .delete(validateToken, deleteBlog);

export default router;
