import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
export default function LandingPage() {
  const { user, jobs } = useContext(AuthContext);

  const navigate = useNavigate();

  const featuredJobs = jobs?.slice(0, 6);

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Find Your Dream Job <br />
          <span className="text-purple-400">or Hire Top Talent</span>
        </h1>

        <p className="mt-6 text-gray-300 max-w-xl">
          A modern job board platform where candidates discover opportunities
          and employers hire the best talent faster.
        </p>

        <div className="mt-8 flex gap-4">
          {!user ? (
            <>
              <Link
                to="/signup"
                className="px-6 py-3 bg-purple-500 rounded-lg hover:bg-purple-600"
              >
                Get Started
              </Link>

              <Link
                to="/jobs"
                className="px-6 py-3 border border-purple-400 rounded-lg hover:bg-purple-500"
              >
                Browse Jobs
              </Link>
            </>
          ) : (
            <Link
              to={user.role === "employer" ? "/employer/dashboard" : "/jobs"}
              className="px-6 py-3 bg-purple-500 rounded-lg hover:bg-purple-600"
            >
              {user.role === "employer" ? "Go to Dashboard" : " Browse Jobs"}
            </Link>
          )}
        </div>
      </section>

      {/*   //featured jobs */}

      <section className="px-6 py-16 bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Jobs</h2>

        {featuredJobs?.length === 0 ? (
          <p className="text-center text-gray-400">No jobs available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-slate-800 p-5 rounded-xl shadow hover:scale-105 transition"
              >
                <h3 className="text-lg font-semibold text-purple-400">
                  {job.title}
                </h3>

                <p className="text-gray-300 mt-1">{job.company}</p>

                <p className="text-sm text-gray-400 mt-1">📍 {job.location}</p>

                <p className="text-sm text-gray-400 mt-1">💼 {job.type}</p>

                <button
                  onClick={() => {
                    navigate(`/jobs/${job._id}`);
                  }}
                  className="mt-4 w-full py-2 bg-purple-500 rounded hover:bg-purple-600"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/jobs"
            className="px-6 py-3 border border-purple-400 rounded-lg hover:bg-purple-500"
          >
            View All Jobs
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 py-16 bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-slate-800 rounded-xl">
            <h3 className="text-xl font-semibold text-purple-400">
              Easy Job Search
            </h3>
            <p className="text-gray-300 mt-2">
              Search and apply for jobs with advanced filters and real-time
              listings.
            </p>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl">
            <h3 className="text-xl font-semibold text-purple-400">
              Employer Dashboard
            </h3>
            <p className="text-gray-300 mt-2">
              Post jobs, manage applicants, and hire candidates efficiently.
            </p>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl">
            <h3 className="text-xl font-semibold text-purple-400">
              Fast Applications
            </h3>
            <p className="text-gray-300 mt-2">
              Apply to jobs instantly with resume upload and tracking system.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Job Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Frontend Developer",
            "Backend Developer",
            "Full Stack",
            "Data Analyst",
            "UI/UX Designer",
            "DevOps",
          ].map((job, i) => (
            <div
              key={i}
              className="px-5 py-3 bg-slate-800 rounded-full hover:bg-purple-500 cursor-pointer transition"
            >
              {job}
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 py-20 text-center bg-gradient-to-r from-purple-900 to-slate-900">
        <h2 className="text-3xl font-bold">Ready to Build Your Career?</h2>

        <p className="text-gray-300 mt-4">
          Join thousands of job seekers and employers today.
        </p>

        {!user && (
          <Link
            to="/signup"
            className="inline-block mt-6 px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200"
          >
            Join Now
          </Link>
        )}
      </section>
    </div>
  );
}
