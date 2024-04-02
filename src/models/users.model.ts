import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  image?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the User model
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please Enter Last Name"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: [true, "Email address already taken"],
    },
    image: {
      type: String,
      required: false,
      default:
        "http://res.cloudinary.com/dw9v1nh6a/image/upload/v1712067870/my-brand/e55c618d4f1863cf9e251c8600e7ac52_gjrlfz.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
const User = model<IUser>("User", UserSchema);
export default User;
