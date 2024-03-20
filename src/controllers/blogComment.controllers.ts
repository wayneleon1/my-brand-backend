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
  } else {
    let newCommentDocument: IBlogComment = new BlogComment({
      name: req.body.name,
      email: req.body.email,
      content: req.body.content,
      blog_id: blog_id,
    });
    let commentData = await newCommentDocument.save();

    await Blog.updateOne(
      { _id: blog_id },
      {
        $push: { comments: commentData._id },
      }
    );

    res
      .status(200)
      .send({ message: "Comment added successfuly", data: commentData });
  }
};
