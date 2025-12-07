import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MONGODB connected");
    
  } catch (error) {
    console.log("❌ MONGODB connection error", error);
    process.exit(1)
  }
};
export default connectDb;
