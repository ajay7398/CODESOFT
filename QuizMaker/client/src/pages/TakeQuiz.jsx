import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById, submitQuiz } from "../api/quizAPI";
import QuestionCard from "../components/QuestionCard";
import { AuthContext } from "../context/AuthContext";
import { MdQuiz } from "react-icons/md";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { HiCheck } from "react-icons/hi";
import { QuizContext } from "../context/QuizContext";

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

 
  const [index, setIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const {quiz,setQuiz,answers, setAnswers} =useContext(QuizContext);

  useEffect(() => {
    getQuizById(id)
      .then((res) => setQuiz(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  console.log(quiz);

  const currentAnswer = answers[index]?.selectedAnswer || null;

  const handleSelect = (answer) => {
    const updated = [...answers];
    updated[index] = {
      questionId: quiz.questions[index]._id,
      selectedAnswer: answer,
    };
    setAnswers(updated);
  };

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  const submit = async () => {
    setSubmitting(true);
    try {
      // const res = await submitQuiz({ quizId: id, answers }, user.token);
    navigate("/result");
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-lime-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading quiz...</p>
      </div>
    </div>
  );

  if (!quiz) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <p className="text-slate-400">Quiz not found</p>
    </div>
  );

  const totalQuestions = quiz.questions.length;
  const answeredCount = answers.filter(Boolean).length;
  const progress = ((index) / totalQuestions) * 100;
  const isLast = index === totalQuestions - 1;

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10">

      {/* Background blob */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-500 to-amber-500 flex items-center justify-center shadow-lg shadow-lime-500/30">
              <MdQuiz className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white truncate">{quiz.title}</h1>
          </div>
          {quiz.description && (
            <p className="text-slate-500 text-sm ml-11">{quiz.description}</p>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Question {index + 1} of {totalQuestions}</span>
            <span>{answeredCount} answered</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-lime-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={quiz.questions[index]}
          onSelect={handleSelect}
          selectedAnswer={currentAnswer}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 gap-4">
          {/* Prev */}
          <button
            onClick={prev}
            disabled={index === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-white text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {/* Answered count badge */}
          <span className="text-xs text-slate-500 hidden sm:block">
            {answeredCount} / {totalQuestions} answered
          </span>

          {/* Next or Submit */}
          {isLast ? (
            <button
              onClick={submit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-lime-600 to-amber-600 hover:from-lime-500 hover:to-amber-500 text-white text-sm font-semibold shadow-lg shadow-lime-500/25 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <HiCheck className="w-4 h-4" />
                  Submit Quiz
                </>
              )}
            </button>
          ) : (
            <button
              onClick={next}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-lime-600 to-amber-600 hover:from-lime-500 hover:to-amber-500 text-white text-sm font-semibold shadow-lg shadow-lime-500/25 transition-all active:scale-95"
            >
              Next
              <FiChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}