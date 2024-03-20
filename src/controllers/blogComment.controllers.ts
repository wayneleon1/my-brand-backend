import { Request, Response } from "express";
import Blog, { IBlog } from "../models/blog.model";
import BlogComment, { IBlogComment} from "../models/blogComment.model";

export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  let blog_id = req.params.blog_id;



    
  res.status(200).send({ message: "Comment added successfuly" });
};
