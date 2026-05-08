import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { BsClipboardCheck } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
const navigate=useNavigate();
  const handleLogout = async() => {
    try {
      await logout();
  setMenuOpen(false);
  navigate("/")
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all">
            <BsClipboardCheck className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-lime-400 to-pink-400 bg-clip-text text-transparent">
            Quiz Maker
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/quizzes"
            className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
          >
            Browse Quizzes
          </Link>

          {user && (
            <Link
              to="/create"
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              Create Quiz
            </Link>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-lime-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-sm text-slate-300 font-medium">{user.name || "User"}</span>
              </div>

              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-white transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 px-3 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm px-4 py-2 rounded-xl bg-gradient-to-r from-lime-600 to-pink-600 hover:from-amber-500 hover:to-lime-500 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-200 active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg bg-slate-800 border border-white/10 text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen
            ? <HiX className="w-5 h-5" />
            : <HiMenu className="w-5 h-5" />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-md px-4 py-4 flex flex-col gap-3">
          <Link
            to="/quizzes"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-slate-400 hover:text-white transition-colors py-2"
          >
            Browse Quizzes
          </Link>

          {user && (
            <Link
              to="/create"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-slate-400 hover:text-white transition-colors py-2"
            >
              Create Quiz
            </Link>
          )}

          <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm text-slate-300">{user.name || "User"}</span>
                </div>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="text-sm px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 text-left transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm px-4 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-300 text-center transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm px-4 py-2 rounded-xl bg-gradient-to-r from-lime-600 to-amber-600 text-white font-semibold text-center transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}