import axios from "axios";

const API = "http://localhost:4000/api";

export const getAllQuizzes = () => axios.get(`${API}/quiz/all`);

export const getQuizById = (id) => axios.get(`${API}/quiz/${id}`);

export const createQuiz = async(data) =>
{
  try {
     axios.post(`${API}/quiz/create`, data, {
   withCredentials:true
  });
    
  } catch (error) {
    console.log(error)
  }
 
}

export const submitQuiz = (data, token) =>
  axios.post(`${API}/attempt/submit`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });