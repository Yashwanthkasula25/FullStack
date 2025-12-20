import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  // We use a function to accept dynamic origins safely
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());

export default app; 
