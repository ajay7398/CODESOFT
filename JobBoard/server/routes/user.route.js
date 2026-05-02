import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuth.js";
import { getMe } from "../controllers/user.controller.js";


const userRouter=Router();

userRouter.get("/me",isAuthenticated,getMe);


export default userRouter;