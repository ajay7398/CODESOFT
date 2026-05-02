import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" ,name:""});
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      console.log(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
    
        <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/40 space-y-5">

          <form onSubmit={handleSubmit} className="space-y-4">
       {/* username */}
         <div>
              <label className="block text-sm text-slate-400 mb-1.5 font-medium">Username</label>
            
               
                <input
                  type="text"
                  placeholder="username"
                  value={form.name}
                  onChange={(e) => setForm({ ...form,name: e.target.value })}
                  required
                  className="w-full bg-slate-800/60 border border-white/10 rounded-xl pl-2 pr-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-slate-800 transition-all duration-200"
                />
            
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-400 mb-1.5 font-medium">Email</label>
            
               
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-slate-800/60 border border-white/10 rounded-xl pl-2 pr-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-slate-800 transition-all duration-200"
                />
            
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-400 mb-1.5 font-medium">Password</label>
               
                <input
                
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full bg-slate-800/60 border border-white/10 rounded-xl pl-2 pr-10 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-slate-800 transition-all duration-200"
                />
               
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-gradient-to-r from-lime-600 to-amber-600 hover:from-lime-500 hover:to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-600 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link to="/login" className="text-lime-400 hover:text-lime-300 font-medium transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}