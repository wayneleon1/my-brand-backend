import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

export interface IProject extends Document {
  projectName: string;
  category: string;
  githubLink: string;
  hostedLink: string;
  image?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Project model
const ProjectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: [true, "Please Enter Project name"],
    },
    category: {
      type: String,
      required: [true, "Please Enter Project Category"],
    },
    githubLink: {
      type: String,
      required: [true, "Please Enter Project Github Link"],
    },
    hostedLink: {
      type: String,
      required: [true, "Please Enter Project Hosted Link"],
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: [true, "Please Enter Project Description"],
    },
  },
  {
    timestamps: true,
  }
);
const Project = model<IProject>("Project", ProjectSchema);
export default Project;
