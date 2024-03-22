import { Request, Response } from "express";
import Blog, { IBlog } from "../models/blog.model";
import { uploadToCloud } from "../helper/cloud";

// get all Blog
export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog: IBlog[] = await Blog.find({});
    res.status(200).json({ data: blog });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
// Create a new Blog
export const createBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id = req.user?.id;
    const { blogTitle, category, blogContent, comments } = req.body;
    let imageUrl: string | undefined = undefined;

    // Checking if user is Existing
    if (!user_id) {
      res.status(400).json({ message: "User ID is missing" });
      return;
    }

    //Check if Image is Uploaded
    if (req.file) {
      const result = await uploadToCloud(req.file, res);
      if ("url" in result) {
        // If 'url' property exists in result, set imageUrl
        imageUrl = result.url;
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    }

    const newBlog: IBlog = new Blog({
      user_id,
      blogTitle,
      category,
      blogContent,
      image: imageUrl,
      comments,
    });

    const savedBlog: IBlog = await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog created successfully", data: savedBlog });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// get a single Blog by ID
export const getBlogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogId: string = req.params.id;
    const blog: IBlog | null = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// update a Blog by ID
export const updateBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogId: string = req.params.id;
    const updatedBlog: IBlog | null = await Blog.findByIdAndUpdate(
      blogId,
      req.body,
      { new: true }
    );
    if (!updatedBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

//  delete a Blog by ID
export const deleteBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogId: string = req.params.id;
    const deletedBlog: IBlog | null = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
