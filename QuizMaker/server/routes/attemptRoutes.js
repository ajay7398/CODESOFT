import express from "express";
import {
  submitAttempt,
  getUserAttempts,
} from "../controllers/attemptController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit", protect, submitAttempt);
router.get("/", protect, getUserAttempts);

export default router;