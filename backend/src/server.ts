import app from "./app";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const PORT = 5000;

app.use("/api/v1/auth", authRoutes); 
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
