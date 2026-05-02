import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const ApplyJob = () => {
  const { jobId } = useParams();
  const { API } = useContext(AuthContext);
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      e.target.value = ""; // reset input
      return;
    }
    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setLoading(true);

      await axios.post(`${API}/api/application/apply/${jobId}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Application submitted successfully!");
      navigate("/candidate/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold">Apply for Job</h2>

        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Resume (PDF only)
          </label>
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4
                       file:rounded file:border-0 file:bg-purple-600 file:text-white
                       hover:file:bg-purple-700 cursor-pointer"
          />
        </div>

        {resume && (
          <p className="text-xs text-slate-400">
            Selected: <span className="text-purple-400">{resume.name}</span>
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !resume}
          className="w-full py-2 bg-purple-500 rounded hover:bg-purple-600 
                     disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Submitting..." : "Apply"}
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;