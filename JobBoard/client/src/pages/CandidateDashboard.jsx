import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

function CandidateDashboard() {
  const { user, setUser } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("profile");
  const [applications, setApplications] = useState([]);
  const [resume, setResume] = useState(null);

  const API = "http://localhost:5000";

  // 🔥 Fetch applied jobs
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${API}/api/application`, {
          withCredentials: true,
        });
        console.log(res);
        setApplications(res.data);
        console.log(res.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();
  }, []);

  // 📄 Resume upload
  const handleResumeUpload = async () => {
    if (!resume) return;

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const res = await axios.post(`${API}/api/user/upload-resume`, formData, {
        withCredentials: true,
      });

      setUser(res.data.user); // update user with resume URL
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900 p-6 space-y-6">
        <h2 className="text-2xl font-bold text-purple-400">Candidate</h2>

        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`block w-full text-left ${
              activeTab === "profile" ? "text-purple-400" : ""
            }`}
          >
            Profile
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`block w-full text-left ${
              activeTab === "applications" ? "text-purple-400" : ""
            }`}
          >
            Applied Jobs
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* PROFILE SECTION */}
        {activeTab === "profile" && (
          <div className="max-w-xl bg-slate-900 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>

            <p className="mb-2">
              <span className="text-gray-400">Name:</span> {user?.name}
            </p>

            <p className="mb-4">
              <span className="text-gray-400">Email:</span> {user?.email}
            </p>

            {/* Resume Upload */}
            <div className="mt-4">
              <label className="block mb-2 text-gray-400">
                Upload Resume
              </label>

              <input
                type="file"
                onChange={(e) => setResume(e.target.files[0])}
                className="mb-3"
              />

              <button
                onClick={handleResumeUpload}
                className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600"
              >
                Upload
              </button>
            </div>

            {/* Resume Link */}
            {user?.resumeUrl && (
              <p className="mt-4">
                <a
                  href={user.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline"
                >
                  View Resume
                </a>
              </p>
            )}
          </div>
        )}

        {/* APPLIED JOBS SECTION */}
        {activeTab === "applications" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Applied Jobs</h2>

            {applications.length === 0 ? (
              <p className="text-gray-400">No applications yet</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {applications?.map((app) => (
                  <div
                    key={app._id}
                    className="bg-slate-900 p-5 rounded-xl shadow"
                  >
                    <h3 className="text-lg font-semibold text-purple-400">
                      {app.job?.title}
                    </h3>

                    <p className="text-gray-300 mt-1">
                      {app.job?.company}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      📍 {app.job?.location}
                    </p>

                    <p className="mt-3 text-sm">
                      Status:{" "}
                      <span className="text-yellow-400">
                        {app.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}


export default CandidateDashboard;