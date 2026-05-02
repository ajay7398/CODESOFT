import { Link } from "react-router-dom";
import { BsClipboardCheck } from "react-icons/bs";
import { FiUser, FiCalendar } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi";

export default function QuizCard({ quiz }) {
  const totalQuestions = quiz.questions?.length || 0;
  const createdAt = new Date(quiz.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl p-5 flex flex-col gap-4 hover:border-lime-500/30 hover:bg-slate-900 transition-all duration-300 group">

      {/* Top */}
      <div className="flex items-start justify-between gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500/20 to-amber-500/20 border border-lime-500/20 flex items-center justify-center text-lime-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          <BsClipboardCheck className="w-5 h-5" />
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 font-medium flex-shrink-0">
          {totalQuestions} {totalQuestions === 1 ? "question" : "questions"}
        </span>
      </div>

      {/* Title & Description */}
      <div className="flex-1">
        <h2 className="text-white font-bold text-lg leading-snug mb-1 group-hover:text-lime-300 transition-colors line-clamp-2">
          {quiz.title}
        </h2>
        {quiz.description && (
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
            {quiz.description}
          </p>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/5 pt-3">
        <span className="flex items-center gap-1.5">
          <FiUser className="w-3.5 h-3.5" />
          {quiz.createdBy?.name || "Anonymous"}
        </span>
        <span className="flex items-center gap-1.5">
          <FiCalendar className="w-3.5 h-3.5" />
          {createdAt}
        </span>
      </div>

      {/* CTA */}
      <Link
        to={`/quiz/${quiz._id}`}
        className="w-full text-center py-2.5 bg-gradient-to-r from-lime-600 to-amber-600 hover:from-lime-500 hover:to-amber-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-lime-500/20 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
      >
        Take Quiz <HiArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}