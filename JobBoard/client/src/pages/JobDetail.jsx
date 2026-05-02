import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

 function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user,API } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API}/api/job/${id}`);
        setJob(res.data.job);
        console.log(res.data.job)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = () => {
    if (!user) {
      navigate(`/apply/${job._id}`);
      return;
    }

    if (user.role !== "candidate") {
      alert("Only candidates can apply for jobs");
      return;
    }

    navigate(`/apply/${job._id}`);
  };

  if (loading) {
    return <div className="text-center mt-20">Loading job...</div>;
  }

  if (!job) {
    return <div className="text-center mt-20">Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-slate-900 p-8 rounded-2xl shadow-lg">

        {/* Title */}
        <h1 className="text-3xl font-bold text-purple-400">
          {job.title}
        </h1>

        {/* Company */}
        <p className="text-lg mt-2">{job.company}</p>

        {/* Info */}
        <div className="flex flex-wrap gap-4 mt-4 text-gray-400">
          <span>📍 {job.location}</span>
          {/* <span>💼 {job.type}</span> */}
          {/* {job.salary && <span>💰 {job.salary}</span>} */}
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="text-gray-300 whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="mt-8 w-full py-3 bg-purple-500 rounded-lg font-semibold hover:bg-purple-600 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobDetail;