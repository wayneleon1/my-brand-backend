import { Request, Response } from "express";
import mongoose from "mongoose";
import Blog, { IBlog } from "../models/blog.model";
import BlogComment, { IBlogComment } from "../models/blogComment.model";

// add Comments on Blog
export const createComment = async (req: Request, res: Response) => {
  let blog_id = req.params.blog_id;

  // checking Blog ID
  if (!mongoose.Types.ObjectId.isValid(blog_id)) {
    return res.status(400).json({ message: "Invalid Blog ID" });
  }

  // Get blog by Id
  const blog: IBlog | null = await Blog.findById(blog_id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  } else {
    try {
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
      return res
        .status(201)
        .send({ message: "Comment added successfuly", data: commentData });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
};

// Get all comments from BlogComments
export const getComments = async (req: Request, res: Response) => {
  try {
    const comment: IBlogComment[] = await BlogComment.find({});
    return res
      .status(200)
      .json({ message: "Comments retrieved successfully", data: comment });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

// Delete a Comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId: string = req.params.id;
    const deletedComment: IBlogComment | null =
      await BlogComment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
