import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

export interface IQueries extends Document {
  names: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the Queries model
const QueriesSchema = new Schema(
  {
    names: {
      type: String,
      required: [true, "Please Enter your  Names"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your Last Name"],
    },
    subject: {
      type: String,
      required: [true, "Please Enter subject"],
    },
    message: {
      type: String,
      required: [true, "Please Enter message"],
    },
  },
  {
    timestamps: true,
  }
);
const Queries = model<IQueries>("Queries", QueriesSchema);
export default Queries;
