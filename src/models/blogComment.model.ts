import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

export interface IBlogComment extends Document {
  name: string;
  email: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the BlogComment model
const BlogCommentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your Names"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your Email"],
    },
    content: {
      type: String,
      require: [true, "Please Enter your content"],
    },
    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  {
    timestamps: true,
  }
);
const BlogComment = model<IBlogComment>("BlogComment", BlogCommentSchema);
export default BlogComment;
