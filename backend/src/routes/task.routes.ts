import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createTask,
  getMyTasks,
  deleteTask,
  updateTask,
  toggleTaskStatus,
} from "../controllers/task.controller";

const router = Router();

router.use(authMiddleware); // 🔥 THIS WAS MISSING

router.post("/", createTask);
router.get("/", getMyTasks);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
router.patch("/:id/toggle", toggleTaskStatus);

export default router;
