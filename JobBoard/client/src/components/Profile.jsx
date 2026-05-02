import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000";

  // 📄 Upload Resume
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/api/user/upload-resume`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 🔥 update user in context
      setUser(res.data.user);

      alert("Resume uploaded successfully!");
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex justify-center">

      <div className="w-full max-w-xl bg-slate-900 p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6 text-purple-400">
          My Profile
        </h2>

        {/* USER INFO */}
        <div className="space-y-3">
          <p>
            <span className="text-gray-400">Name:</span>{" "}
            {user?.name}
          </p>

          <p>
            <span className="text-gray-400">Email:</span>{" "}
            {user?.email}
          </p>

          <p>
            <span className="text-gray-400">Role:</span>{" "}
            {user?.role}
          </p>
        </div>

        {/* RESUME SECTION */}
        <div className="mt-8">

          <h3 className="text-lg font-semibold mb-3">
            Resume
          </h3>

          {/* Upload Input */}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 block"
          />

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>

          {/* Resume Link */}
          {user?.resumeUrl && (
            <div className="mt-4">
              <p className="text-gray-400">Current Resume:</p>

              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                View Resume
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}