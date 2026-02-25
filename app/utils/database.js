import mongoose from "mongoose";

const connectDB = async() => {

  try {
    await mongoose.connect("mongodb+srv://f331dpprpl_db_user:06Je44Beck24_mongo@cluster0.e4ztg6e.mongodb.net/nextAppDataBase?appName=Cluster0");
    console.log("Success: Connect to MongoDB");
  } catch {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
}

export default connectDB