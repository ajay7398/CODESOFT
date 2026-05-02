import { useEffect, useState } from "react";
import { getAllQuizzes } from "../api/quizAPI";
import QuizCard from "../components/QuizCard";
import { FiSearch } from "react-icons/fi";
import { MdQuiz } from "react-icons/md";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllQuizzes()
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = quizzes.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10">

      {/* Background blob */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-lime-500 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <MdQuiz className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-lime-400 to-amber-400 bg-clip-text text-transparent">
              Browse Quizzes
            </h1>
          </div>
          <p className="text-slate-400 ml-13">
            Discover and take quizzes created by the community
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500/60 transition-all"
          />
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-900/50 border border-white/10 rounded-2xl h-56 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <MdQuiz className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No quizzes found</h3>
            <p className="text-slate-400">
              {search
                ? "Try a different search term"
                : "No quizzes have been created yet"}
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <>
            <p className="text-slate-500 text-sm mb-4">
              {filtered.length} {filtered.length === 1 ? "quiz" : "quizzes"} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((q) => (
                <QuizCard key={q._id} quiz={q} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}