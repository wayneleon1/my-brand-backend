import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  hostedLink: string;
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
      required: [true, "Please Enter email"],
    },
    image: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: [true, "Please Enter User role"],
    },
  },
  {
    timestamps: true,
  }
);
const User = model<IUser>("User", UserSchema);
export default User;