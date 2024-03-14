import mongoose from "mongoose";

const { Schema, model } = mongoose;

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
const Skills = model("Skills", SkillsSchema);
export default Skills;
