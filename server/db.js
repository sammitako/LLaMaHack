import { connect } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

// 4. Connect to MongoDB
export async function connectToMongo() {
  console.log("Connecting to DB");
  const dbName = "llamahack";
  const connectionUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@llamacluster.pawmzc3.mongodb.net/?retryWrites=true&w=majority`;
  await connect(connectionUrl);
  console.log("Connection Successful");
}
