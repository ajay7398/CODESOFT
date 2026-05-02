import express from "express";
import {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById,
} from "../controllers/job.controller.js";

import { isAuthenticated } from "../middleware/isAuth.js";

const jobRouter = express.Router();

// ✅ CREATE
jobRouter.post("/", isAuthenticated, createJob);

// ✅ UPDATE
jobRouter.put("/:id", isAuthenticated, updateJob);

// ✅ DELETE
jobRouter.delete("/:id", isAuthenticated, deleteJob);

// ✅ GET ALL
jobRouter.get("/", getAllJobs);

// ✅ GET ONE
jobRouter.get("/:id", getJobById);

export default jobRouter;