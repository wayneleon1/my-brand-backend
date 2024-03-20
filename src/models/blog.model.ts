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
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Blog",
    },
    blogTitle: {
      type: String,
      required: [true, "Please Enter Blog Title"],
    },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "BlogComment" }],
    blogContent: {
      type: String,
      required: [true, "Please Enter Blog Content"],
    },
    image: {
      type: String,
      required: false,
    },
    comments: {
      type: Array,
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const Blog = model<IBlog>("Blog", BlogSchema);
export default Blog;
