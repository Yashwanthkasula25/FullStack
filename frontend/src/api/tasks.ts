import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchMyTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

export const createTask = async (data: {
  title: string;
  description: string;
}) => {
  const res = await API.post("/tasks", data);
  return res.data;
};
