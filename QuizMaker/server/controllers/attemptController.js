import Attempt from "../models/Attempt.js";
import Quiz from "../models/Quiz.js";

// SUBMIT QUIZ
export const submitAttempt = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;

    // Calculate score
    quiz.questions.forEach((question) => {
      const userAnswer = answers.find(
        (ans) => ans.questionId === question._id.toString()
      );

      if (userAnswer && userAnswer.selectedAnswer === question.correctAnswer) {
        score++;
      }
    });

    const attempt = await Attempt.create({
      userId: req.user.id,
      quizId,
      answers,
      score,
    });

    res.status(201).json({
      message: "Quiz submitted",
      score,
      total: quiz.questions.length,
      attempt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER ATTEMPTS
export const getUserAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({
      userId: req.user.id,
    }).populate("quizId", "title");

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};