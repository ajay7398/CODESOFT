import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import { Link } from "react-router-dom";
import { FiCheck, FiX, FiList } from "react-icons/fi";
import { MdQuiz, MdOutlineReplay } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Result() {
  const { quiz, answers } = useContext(QuizContext);

  let correct = 0;
  let incorrect = 0;
  const totalQuestions = quiz.questions.length;

  answers.forEach((a) => {
    const q = quiz.questions.find((item) => item._id === a.questionId);
    if (q && a.selectedAnswer === q.correctAnswer) {
      correct++;
    } else {
      incorrect++;
    }
  });

  const percentage = Math.round((correct / totalQuestions) * 100);
  const skipped = totalQuestions - answers.filter(Boolean).length;


  // Score ring
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dash = (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10">

      <div className="max-w-2xl mx-auto relative z-10 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-500 to-amber-500 flex items-center justify-center shadow-lg shadow-lime-500/30">
            <MdQuiz className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-bold text-white truncate">{quiz.title}</h1>
        </div>

        {/* Score Card */}
        <div className="bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-slate-400 text-sm mb-6">Quiz Complete!</p>

          {/* Score Ring */}

<div style={{ width: 200, height: 200 }} className="w-full flex items-center justify-center">
  <CircularProgressbar value={percentage} text={`${percentage}%`} />
</div>
          <p className="text-slate-400 text-sm">
            You scored <span className="text-white font-semibold">{correct}</span> out of{" "}
            <span className="text-white font-semibold">{totalQuestions}</span> questions
          </p>
        </div>

    

        {/* Answer Review */}
        <div className="bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <FiList className="w-4 h-4 text-lime-400" />
            Answer Review
          </h3>
          <div className="space-y-3">
            {quiz.questions.map((q, idx) => {
              const userAnswer = answers.find((a) => a?.questionId === q._id);
              const isCorrect = userAnswer?.selectedAnswer === q.correctAnswer;
              const isSkipped = !userAnswer;

              return (
                <div
                  key={q._id}
                  className={`p-4 rounded-xl border transition-all ${
                    isSkipped
                      ? "border-white/10 bg-slate-800/40"
                      : isCorrect
                      ? "border-lime-500/30 bg-lime-500/5"
                      : "border-rose-500/30 bg-rose-500/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Status icon */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSkipped
                        ? "bg-slate-700 text-slate-400"
                        : isCorrect
                        ? "bg-lime-500/20 text-lime-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}>
                      {isSkipped ? (
                        <span className="text-xs font-bold">—</span>
                      ) : isCorrect ? (
                        <FiCheck className="w-3.5 h-3.5" />
                      ) : (
                        <FiX className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium leading-snug mb-2">
                        <span className="text-slate-500 mr-1">Q{idx + 1}.</span>
                        {q.questionText}
                      </p>

                      {!isSkipped && !isCorrect && (
                        <p className="text-xs text-rose-400 mb-1">
                          Your answer:{" "}
                          <span className="font-semibold">{userAnswer?.selectedAnswer}</span>
                        </p>
                      )}

                      <p className={`text-xs font-semibold ${isCorrect ? "text-lime-400" : "text-lime-300"}`}>
                        {isSkipped ? (
                          <span className="text-slate-500">Skipped</span>
                        ) : (
                          <>Correct: <span>{q.correctAnswer}</span></>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button*/}
          <Link
            to="/quizzes"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-white font-semibold transition-all active:scale-95"
          >
            Browse Quizzes
            <HiArrowRight className="w-4 h-4" />
          </Link>
      </div>
    </div>
  );
}