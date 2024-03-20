import { Request, Response } from "express";
import mongoose from "mongoose";
import Blog, { IBlog } from "../models/blog.model";
import BlogComment, { IBlogComment } from "../models/blogComment.model";

export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  let blog_id = req.params.blog_id;

  // checking Blog ID
  if (!mongoose.Types.ObjectId.isValid(blog_id)) {
    res.status(400).json({ message: "Invalid Blog ID" });
    return;
  }

  // Get blog by Id
  const blog: IBlog | null = await Blog.findById(blog_id);
  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  res.status(200).send({ message: "Comment added successfuly" });
};
