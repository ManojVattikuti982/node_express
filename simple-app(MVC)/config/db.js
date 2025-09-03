import mongoose from "mongoose";

//db connection
async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (error) {
    console.log("db connection error", error.message);
  }
}

export default dbConnect;