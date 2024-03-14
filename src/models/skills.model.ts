import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

export interface ISkills extends Document {
  name: string;
  type: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Skills model
const SkillsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Skills name"],
    },
    type: {
      type: String,
      required: [true, "Please Enter Skills Type"],
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const Skills = model<ISkills>("Skills", SkillsSchema);
export default Skills;
