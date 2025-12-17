import { Router } from "express";
import { createTask, getMyTasks } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getMyTasks);

export default router;
