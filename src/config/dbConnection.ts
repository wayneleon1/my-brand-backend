import mongoose from "mongoose";

// Connect to Real Database/
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.KEY}@backend.a1mvapj.mongodb.net/${process.env.COLLECTION_NAME}?retryWrites=true&w=majority&appName=backend`
    );
    console.log("Connected to the Database");
  } catch (error) {
    console.log("Connection fail");
  }
};

// Connect to Test Database
export const testConnectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://test-admin:MJ6R6DZKfS4v4DpG@cluster0.zel7qfl.mongodb.net/test-my-brand?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Your are connected on Test Database");
  } catch (error) {
    console.log("failed to connect on Test Database", error);
  }
};
