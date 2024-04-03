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
      `mongodb+srv://${process.env.TEST_USER_NAME}:${process.env.TEST_KEY}@cluster0.zel7qfl.mongodb.net/${process.env.TEST_COLLECTION_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Your are connected on Test Database");
  } catch (error) {
    console.log("failed to connect on Test Database", error);
  }
};

export const testDisconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from the Test Database");
  } catch (error) {
    console.log("Failed to disconnect from the Test Database", error);
  }
};
