import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  deleteQuiz,
} from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create", protect, createQuiz);
router.get("/all", getAllQuizzes);
router.get("/:id", getQuizById);
router.delete("/:id", protect, deleteQuiz);

export default router;