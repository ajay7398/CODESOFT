import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const API="http://localhost:4000"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = async(data) => {
const res=await axios.post(API+"/api/auth/login",data,{withCredentials:true})
    setUser(res.data.user);
   
  };

  const getMe=async()=>{
    try {
     const res= await axios.get(API+"/api/auth/me",{withCredentials:true});
      setUser(res.data.user);
      console.log(res.data.user);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
getMe();
  },[])

  const register=async(data)=>{
    try {
        const res=await axios.post(API+"/api/auth/register",data,{withCredentials:true})
       setUser(res.data);
    } catch (error) {
      console.log("registerd error",error)
    }
  
   
  }

  const logout = async() => {
  try {
    await axios.post(API+"/api/auth/logout",{},{withCredentials:true});
    setUser(null);
  } catch (error) {
    console.log(error)
  }
  };

  

  return (
    <AuthContext.Provider value={{ user, login, logout ,register,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};