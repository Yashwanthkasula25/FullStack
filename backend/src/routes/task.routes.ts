import { Router } from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
} from "../controllers/task.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", requireAuth, getTasks);
router.post("/", requireAuth, createTask);
router.put("/:id", requireAuth, updateTask);
router.delete("/:id", requireAuth, deleteTask);

export default router;
