import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate", // ✅ default role
  });

  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setForm({ ...form, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(form);
      navigate("/");
    } catch (error) {
      console.log("signup error", error);
    }
  };

  return (
    <div className="min-h-screen pt-2 pb-2 flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 🔥 Role Selection */}
          <div>
            <p className="text-gray-300 mb-2 text-sm">Select Role</p>
            <div className="flex gap-4">
              
              {/* Candidate */}
              <button
                type="button"
                onClick={() => handleRoleChange("candidate")}
                className={`flex-1 py-2 rounded-lg border transition ${
                  form.role === "candidate"
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white/10 text-gray-300 border-white/20"
                }`}
              >
                Job Seeker
              </button>

              {/* Employer */}
              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`flex-1 py-2 rounded-lg border transition ${
                  form.role === "employer"
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white/10 text-gray-300 border-white/20"
                }`}
              >
                Employer
              </button>
            </div>
          </div>

          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 pt-5 pb-2 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Name"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 pt-5 pb-2 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Email"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 pt-5 pb-2 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
          >
            Sign Up
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-300 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;