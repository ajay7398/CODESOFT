import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
dotenv.config();
import cors from "cors"
const app=express();
const port=process.env.PORT || 6000;
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.routes.js";

app.use(express.json());
app.use(cors({
  origin: ["https://jobtation.netlify.app","http://localhost:5173" ],
  credentials: true
}));

app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/job",jobRouter);
app.use("/api/application",applicationRouter);
app.listen((port),()=>{
console.log(`server is running on port ${port}`);
connectDB();
});

