import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "*", // Allow ANY website to talk to us (Easiest fix for assessment)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));

app.use(express.json());

export default app; 
