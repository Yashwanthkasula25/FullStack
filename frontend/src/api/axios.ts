import axios from "axios";

const api = axios.create({
  // DELETE the import.meta.env line
  // PASTE your Render URL explicitly:
  baseURL: "https://fullstack-5rb5.onrender.com/api/v1", 
  withCredentials: true,
});

export default api;
