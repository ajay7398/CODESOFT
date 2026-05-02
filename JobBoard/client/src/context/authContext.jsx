import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user,setUser]=useState(null);
const [loading,setLoading]=useState(true);
const [jobs,setJobs]=useState([]);
const [jobInfo,setJobInfo]=useState(null);
const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
   const API=import.meta.env.VITE_API_URL ;

 

  // 🔁 Check user on refresh
  const getCurrentUser = async () => {
    
    try {
     
      setLoading(true);
      const res = await axios.get(API+"/api/user/me",{withCredentials:true});
      setUser(res?.data?.user);
  
  
    } catch (error) {
      console.log(error)
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Fetch Jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get(API+"/api/job", {
        params: { search, location, type, page, limit: 6 },
      });

      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
    console.log(API)
  }, [search, location, type, page]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  // 🔐 Signup
 const signup = async (data) => {
  try {
    const res = await axios.post(API + "/api/auth/signup", data, {
      withCredentials: true
    });

    setUser(res.data.user);
    return res;

  } catch (error) {
    console.log("Signup error:", error.response?.data?.message);
    throw error; // 🔥 important
  }
};

  // 🔐 Login
  const login = async (data) => {
    const res = await axios.post(API+"/api/auth/login",data,{withCredentials:true});
    console.log(res.data)
    setUser(res?.data?.user);
    return res;
  };


  // 🚪 Logout
  const logout = async () => {
    await axios.post(API+"/api/auth/logout",{},{withCredentials:true});
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout,loading,setUser,jobs,totalPages ,jobInfo,setJobInfo,API,setPage,setSearch,setType,setLocation,fetchJobs,search,page,type,location}}
    >
      {children}
    </AuthContext.Provider>
  );
};

