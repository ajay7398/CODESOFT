import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/authContext";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import Navbar from "./components/Navbar.jsx"
import JobDetail from "./pages/JobDetail.jsx";
import PostJob from "./components/PostJob.jsx";
import Profile from "./components/Profile.jsx";
import JobListingPage from "./pages/JobListingPage.jsx";
import Footer from "./components/Footer.jsx";
import ApplyJob from "./components/ApplyJob.jsx";
import ApplicantsPage from "./components/ApplicantsPage.jsx";
import EditJob from "./components/EditJob.jsx";
function App() {
  const { user, loading } = useContext(AuthContext);

 

  if (loading) return <div>Loading...</div>;

  return (
    <>

  {
   user && <Navbar/>
  }
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />

      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />

      {/* Role-based dashboards */}
      <Route
        path="/employer/dashboard"
        element={
          user?.role === "employer"
            ? <EmployerDashboard />
            : <Navigate to="/" />
        }
      />

      <Route
        path="/candidate/dashboard"
        element={
          user?.role === "candidate"
            ? <CandidateDashboard />
            : <Navigate to="/" />
        }
      />

      {/* Protected Landing */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        }
      />
      <Route path="/jobs/:id" element={<JobDetail />}/>
      <Route path="/employer/jobs/create" element={<PostJob/>}/>
      <Route path="/user/profile" element={<Profile/>}/>
      <Route path="/jobs" element={<JobListingPage/>}/>
      <Route path="/apply/:jobId" element={<ApplyJob />} />
      <Route path="/employer/jobs/:id/applicants" element={<ApplicantsPage />}
/>
<Route
  path="/employer/jobs/edit/:id"
  element={<EditJob />}
/>
    </Routes>
    {
   user && <Footer/>
  }
    </>
  );
}

export default App;