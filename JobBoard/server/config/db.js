import mongoose from "mongoose"

const connectDB=async()=>{
try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database is connected");
} catch (error) {
    console.log("database connecting error:",error);
}
}

export default connectDB;