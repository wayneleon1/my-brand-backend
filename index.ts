import { connectToDatabase } from "./src/config/dbConnection";
import app from "./src/app";

const startServer = async () => {
    await connectToDatabase();
    
  // listening to the port
  app.listen(process.env.PORT, () => {
    console.log("You are listening on port http://localhost:3000");
  });
};

startServer();
