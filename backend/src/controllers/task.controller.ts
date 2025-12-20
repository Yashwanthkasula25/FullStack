import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createTask = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { title, description } = req.body;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status: "PENDING",
      userId: req.user.id,
    },
  });

  res.status(201).json(task);
};

export const getMyTasks = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const tasks = await prisma.task.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });

  res.json(tasks);
};

export const toggleTaskStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return res.status(404).json({ message: "Not found" });

  const updated = await prisma.task.update({
    where: { id },
    data: {
      status: task.status === "COMPLETED" ? "PENDING" : "COMPLETED",
    },
  });

  res.json(updated);
};
export const updateTask = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;
  const { title, description } = req.body;

  const task = await prisma.task.update({
    where: { id },
    data: {
      title,
      description,
    },
  });

  res.json(task);
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  await prisma.task.delete({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};
