import express, { Router } from "express";
const router: Router = express.Router();
import {
  getBlog,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controllers";

router.get("/", getBlog);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
