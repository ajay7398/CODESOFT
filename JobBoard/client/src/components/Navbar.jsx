import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Menu, X, User, MessageSquareText, Bell } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // mobile
  const [profileOpen, setProfileOpen] = useState(false); // drawer

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full bg-slate-900 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="text-xl font-bold text-purple-400">
            JobBoard
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-purple-300 hover:underline">
              Home
            </Link>

            <Link to="/jobs" className="hover:text-purple-300 hover:underline">
              Jobs
            </Link>
              <Link className="hover:text-purple-300 hover:underline">
              Companies
            </Link>
              <Link className="hover:text-purple-300 hover:underline">
              Services
            </Link>
          </div>
          {/* AUTH / PROFILE */}

          {!user ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-1 border border-purple-500 rounded hover:bg-purple-500"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 bg-purple-500 rounded hover:bg-purple-600"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="flex items-center sm:gap-4 gap-1">
              <div className="tooltip tooltip-bottom" data-tip="Messages">
                <button className="btn btn-ghost btn-circle">
                  <MessageSquareText />
                </button>
              </div>
 <div className="tooltip tooltip-bottom" data-tip="Notifications">
                <button className="btn btn-ghost btn-circle">
                     <Bell />
                </button>
              </div>
           
              {user.role === "employer" ? (
                <button onClick={()=>navigate("/employer/jobs/create")} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-full">
                  Post Job
                </button>
              ) : (
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-full">
                  Find Job
                </button>
              )}
              <button
                onClick={() => setProfileOpen(true)}
                className="p-2 hidden sm:block ring-1 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600"
              >
                <h1>{user.name.charAt(0)}</h1>
              </button>
            </div>
          )}
          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-slate-800 px-4 pb-4 space-y-3">
            <Link to="/" onClick={() => setOpen(false)} className="block">
              Home
            </Link>

            <Link to="/jobs" onClick={() => setOpen(false)} className="block">
              Jobs
            </Link>

            {user?.role === "candidate" && (
              <Link to="/candidate/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            )}

            {user?.role === "employer" && (
              <Link to="/employer/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            )}

            {!user ? (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  Signup
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-red-400">
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* 🔥 PROFILE DRAWER (RIGHT SIDE) */}
      {user && (
        <>
          <div
            className={`fixed top-0 right-0 h-full w-72 bg-slate-900 text-white shadow-lg transform transition-transform duration-300 z-50 ${
              profileOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* HEADER */}
            <div className="p-6 flex justify-between items-center border-b border-slate-700">
              <div></div>
              <h2 className="font-bold text-xl">{user.name}</h2>
              <button onClick={() => setProfileOpen(false)}>
                <X />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-6">
              {/* USER INFO */}
              <button
                onClick={() => {
                  navigate("/user/profile");
                  setProfileOpen(false);
                }}
                className="w-full text-left px-4 py-2 bg-slate-800 rounded hover:bg-slate-700"
              >
                Profile
              </button>

              {/* DASHBOARD */}
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate(
                    user.role === "employer"
                      ? "/employer/dashboard"
                      : "/candidate/dashboard",
                  );
                }}
                className="w-full text-left px-4 py-2 bg-slate-800 rounded hover:bg-slate-700"
              >
                Dashboard
              </button>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 bg-red-500 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          {/* OVERLAY */}
          {profileOpen && (
            <div
              onClick={() => setProfileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
          )}
        </>
      )}
    </>
  );
};

export default Navbar;
