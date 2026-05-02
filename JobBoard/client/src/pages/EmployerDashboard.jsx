import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function EmployerDashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// const [applications,setApplications]=useState(0);
  const { API } = useContext(AuthContext);

  // const getAllApplicants=async()=>{
  //   const res=await axios.get(API+"/api/application",{withCredentials:true});
  //   setApplications(res.data.totalApplicants);
  // }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API}/api/job`, {
          withCredentials: true,
        });
        setJobs(res.data.jobs);
      } catch (error) {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    // getAllApplicants();
  }, []);

  console.log("jobs:",jobs)

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this job?");
    if (!confirm) return;

    try {
      await axios.delete(`${API}/api/job/${id}`, {
        withCredentials: true,
      });

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Welcome Employer 👋</h1>

        <button
          onClick={() => navigate("/employer/jobs/create")}
          className="mt-4 md:mt-0 px-5 py-2 bg-purple-500 rounded-lg hover:bg-purple-600"
        >
          + Post New Job
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="text-red-400 mb-6">{error}</p>}

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-slate-900 p-6 rounded-xl shadow">
          <h3 className="text-gray-400">Total Jobs Posted</h3>
          <p className="text-3xl font-bold mt-2">{jobs.length}</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl shadow">
          <h3 className="text-gray-400">Applications Received</h3>
          <p className="text-3xl font-bold mt-2">
            {jobs.reduce((acc, job) => acc + (job.applicants?.length || 0), 0)}
          </p>
        </div>
      </div>

      {/* JOB LIST */}
      <div className="bg-slate-900 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-6">My Jobs</h2>

        {loading ? (
          <p>Loading...</p>
        ) : jobs.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>No jobs posted yet</p>
            <button
              onClick={() => navigate("/employer/jobs/create")}
              className="mt-4 px-4 py-2 bg-purple-500 rounded"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-slate-700">
                  <th className="py-3">Title</th>
                  <th>Applicants</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job._id}
                    className="border-b border-slate-800 hover:bg-slate-800"
                  >
                    <td className="py-4 font-medium">{job.title}</td>

                    <td >
                      <button
                      
                        className="text-green-400"
                      >
                        {job.applicants?.length || 0}
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/employer/jobs/${job._id}/applicants`)
                        }
                        className="px-3 py-1 text-sm rounded hover:underline text-green-400"
                      >
                        View
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          navigate(`/employer/jobs/edit/${job._id}`)
                        }
                        className="text-blue-400 hover:underline"
                      >
                        Edit
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
