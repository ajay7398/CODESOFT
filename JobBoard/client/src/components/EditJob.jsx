import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API,fetchJobs } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    type: "Full-time",
  });

  // ✅ Fetch existing job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API}/api/job/${id}`, {
          withCredentials: true,
        });

        const job = res.data.job;

        setFormData({
          title: job.title || "",
          description: job.description || "",
          company: job.company || "",
          location: job.location || "",
          type: job.type || "Full-time",
          salary: job.salary || "",
         
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, [id]);

  // ✅ Handle input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.put(
        `${API}/api/job/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      alert("Job updated successfully");
      navigate("/employer/dashboard");
    fetchJobs();
    } catch (error) {
      console.log(error);
      alert("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-3xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          Edit Job
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          {/* TITLE */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Job Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-slate-800 outline-none"
            />
          </div>

          {/* COMPANY */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Company
            </label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-slate-800 outline-none"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-slate-800 outline-none"
            />
          </div>

          {/* TYPE */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Job Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 outline-none"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          {/* SALARY */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Salary
            </label>

            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 outline-none"
            />
          </div>

         
          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm text-gray-300">
              Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-slate-800 outline-none"
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold"
        >
          {loading ? "Updating..." : "Update Job"}
        </button>
      </form>
    </div>
  );
};

export default EditJob;