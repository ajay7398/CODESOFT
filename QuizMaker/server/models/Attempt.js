import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    answers: [
      {
        questionId: String,
        selectedAnswer: String,
      },
    ],
    score: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Attempt", attemptSchema);