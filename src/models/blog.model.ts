import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

export interface IBlog extends Document {
  blogTitle: string;
  category: string;
  blogContent: string;
  image?: string;
  comments?: String;
  createdAt: Date;
  updatedAt: Date;
}
// Define the schema for the Blog model
const BlogSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    blogTitle: {
      type: String,
      required: [true, "Please Enter Blog Title"],
    },
    category: {
      type: String,
      required: [true, "Please Enter category"],
    },
    blogContent: {
      type: String,
      required: [true, "Please Enter Blog Content"],
    },
    image: {
      type: String,
      required: false,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "BlogComment" }],
  },
  {
    timestamps: true,
  }
);
const Blog = model<IBlog>("Blog", BlogSchema);
export default Blog;
