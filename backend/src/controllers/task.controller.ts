import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

/**
 * CREATE TASK
 */
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(),
        priority: "MEDIUM",
        status: "PENDING",

        // relations (REQUIRED by Prisma schema)
        creator: {
          connect: { id: req.user!.id },
        },
        assignedTo: {
          connect: { id: req.user!.id },
        },
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

/**
 * GET MY TASKS
 */
export const getMyTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        assignedToId: req.user!.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};
