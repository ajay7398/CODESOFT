import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const JobListingPage = () => {
const {jobs,totalPages,setPage,setSearch,setType,setLocation,fetchJobs,search,page,type,location} =useContext(AuthContext);

  

const navigate=useNavigate();


  


  
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      
      {/* 🔍 SEARCH + FILTERS */}
      <div className="max-w-6xl mx-auto mb-10 grid md:grid-cols-4 gap-4">
        
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="px-4 py-2 rounded bg-slate-800 outline-none"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => {
            setPage(1);
            setLocation(e.target.value);
          }}
          className="px-4 py-2 rounded bg-slate-800 outline-none"
        />

        <select
          value={type}
          onChange={(e) => {
            setPage(1);
            setType(e.target.value);
          }}
          className="px-4 py-2 rounded bg-slate-800"
        >
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
        </select>

        <button
          onClick={fetchJobs}
          className="bg-purple-500 rounded px-4 py-2 hover:bg-purple-600"
        >
          Search
        </button>
      </div>

      {/* 📋 JOB LIST */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <p className="text-gray-400">No jobs found</p>
        ) : (
          jobs?.map((job) => (
            <div
              key={job._id}
              className="bg-slate-800 p-5 rounded-xl shadow hover:scale-105 transition"
            >
              <h3 className="text-lg font-semibold text-purple-400">
                {job.title}
              </h3>

              <p className="text-gray-300">{job.company}</p>

              <p className="text-sm text-gray-400">
                📍 {job.location}
              </p>

              <p className="text-sm text-gray-400">
                💼 {job.type}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                💰 {job.salary || "Not disclosed"}
              </p>

              <button
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="mt-4 w-full py-2 bg-purple-500 rounded hover:bg-purple-600"
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* 📄 PAGINATION */}
      <div className="flex justify-center mt-10 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded ${
              page === i + 1
                ? "bg-purple-500"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobListingPage;