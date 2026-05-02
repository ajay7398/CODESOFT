import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 4v16m8-8H4" />
      </svg>
    ),
    title: "Create Quizzes",
    desc: "Build custom quizzes with multiple-choice questions in minutes.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Take Quizzes",
    desc: "Browse community quizzes and test your knowledge instantly.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Track Scores",
    desc: "Get instant feedback and see how you rank on the leaderboard.",
  },
];

export default function Home() {
  const {user}=useContext(AuthContext);
  return (
    <div className="min-h-screen border-l border-r border-t bg-slate-950 text-white overflow-hidden relative">

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-16 pb-20">

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-lime-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Quiz Maker
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          Create engaging quizzes, challenge your friends, and test your knowledge —
          all in one beautifully simple platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/create"
            className="px-8 py-3.5 bg-gradient-to-r from-lime-600 to-pink-600 hover:from-lime-500 hover:to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-200 active:scale-95 flex items-center gap-2 justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" />
            </svg>
            Create a Quiz
          </Link>

          <Link
            to="/quizzes"
            className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-95 flex items-center gap-2 justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Browse Quizzes
          </Link>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { value: "500+", label: "Quizzes Created" },
            { value: "10K+", label: "Questions Asked" },
            { value: "2K+", label: "Active Users" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-slate-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Everything You Need</h2>
          <p className="text-slate-400">Powerful features packed into a simple interface.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-slate-900/70 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-lime-500/30 hover:bg-slate-900 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-500/20 to-amber-500/20 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-blue-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-slate-400 mb-6">Join thousands of users creating and taking quizzes every day.</p>
         {user ? (
  <Link
    to="/quizzes"
    className="inline-block px-8 py-3.5 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl"
  >
    Start Exploring →
  </Link>
) : (
  <Link
    to="/register"
    className="inline-block px-8 py-3.5 bg-gradient-to-r from-lime-600 to-pink-600 text-white rounded-2xl"
  >
    Get Started Free →
  </Link>
)}
        </div>
      </section>

    </div>
  );
}