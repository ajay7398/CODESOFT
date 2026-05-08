import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import attemptRoutes from "./routes/attemptRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
const port=process.env.PORT || 5000;
const app = express();


app.use(cookieParser());
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://quizsetter.netlify.app", "http://localhost:5173"], 
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/attempt", attemptRoutes);


app.listen(port,()=>{
    console.log("server is running",port);
    connectDB();
})