import axios from "axios";
import type { RegisterInput } from "../utils/auth.schema";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export const registerUser = async (data: RegisterInput) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};
