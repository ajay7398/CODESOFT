import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function PostJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { API } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !form.title ||
      !form.company ||
      !form.location ||
      !form.type ||
      !form.description
    ) {
      return "Please fill all required fields";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(`${API}/api/job`, form, {
        withCredentials: true,
      });
      alert("posted");
      // ✅ redirect after success
      navigate("/employer/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-slate-950 text-white flex justify-center items-center px-4 py-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-2xl space-y-5 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center text-purple-400">
          Post a Job
        </h2>

        {/* Error */}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* Title */}
        <input
          name="title"
          placeholder="Job Title *"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded-lg focus:outline-none"
        />

        {/* Company */}
        <input
          name="company"
          placeholder="Company Name *"
          value={form.company}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded-lg focus:outline-none"
        />

        {/* Location */}
        <input
          name="location"
          placeholder="Location *"
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded-lg focus:outline-none"
        />

        {/* Type */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded-lg"
        >
          <option value="">Select Job Type *</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        {/* Salary */}
        <input
          name="salary"
          placeholder="Salary (optional)"
          value={form.salary}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded-lg focus:outline-none"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description *"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 bg-slate-800 rounded-lg focus:outline-none"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-500 rounded-lg font-semibold hover:bg-purple-600 transition"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
