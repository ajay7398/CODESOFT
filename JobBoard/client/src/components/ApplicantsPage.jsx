import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function ApplicantsPage() {
  const { id } = useParams();
  const { API } = useContext(AuthContext);

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${API}/api/application/${id}`, {
          withCredentials: true,
        });
        setApplicants(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchApplicants();
  }, [id]);

  const updateStatus = async (applicantId, status) => {
    try {
     await axios.put(
        `${API}/api/application/${id}/applicants/${applicantId}`,
        { status },
        { withCredentials: true },
      );

      setApplicants((prev) =>
        prev.map((a) => (a._id === applicantId ? { ...a, status } : a)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Applicants</h1>

      {applicants.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        <div className="space-y-4">
          {applicants.map((a) => (
            <div
              key={a._id}
              className="bg-slate-900 p-5 rounded-xl flex justify-between items-center"
            >
              {/* LEFT */}
              <div>
                <h2 className="font-semibold">{a.candidate?.name}</h2>
                <p className="text-gray-400 text-sm">{a.candidate?.email}</p>

                {
                a.resume && (
                  <a href={a.resume} target="_blank" rel="noreferrer">
                    View Resume
                  </a>
                )
                
                }
              </div>

              {/* RIGHT */}
              <div className="flex gap-3 items-center">
                <span
                  className={`px-3 py-1 rounded text-sm ${
                    a.status === "accepted"
                      ? "bg-green-600"
                      : a.status === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-600"
                  }`}
                >
                  {a.status}
                </span>

                <button
                  onClick={() => updateStatus(a._id, "accepted")}
                  className="px-3 py-1 bg-green-500 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(a._id, "rejected")}
                  className="px-3 py-1 bg-red-500 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
