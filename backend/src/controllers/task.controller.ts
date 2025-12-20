import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { TaskService } from "../services/task.service";
import { PrismaClient, Status } from "@prisma/client";

// Initialize Prisma and Service
const prisma = new PrismaClient();
const taskService = new TaskService();

/* ================= 1. CREATE TASK ================= */
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Use Service for creation (handles the new DTO logic)
    const task = await taskService.createTask(userId, req.body);
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= 2. GET MY TASKS ================= */
export const getMyTasks = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

/* ================= 3. TOGGLE TASK ================= */
export const toggleTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    // FIX: Use Enums (Status.TODO), NOT strings ("PENDING")
    const newStatus = 
      task.status === Status.COMPLETED ? Status.TODO : Status.COMPLETED;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status: newStatus },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error toggling task" });
  }
};

/* ================= 4. UPDATE TASK ================= */
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: { title, description },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

/* ================= 5. DELETE TASK ================= */
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.task.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};