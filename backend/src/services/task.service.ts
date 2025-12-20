// backend/src/services/task.service.ts

import { PrismaClient, Priority, Status } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

export class TaskService {

  // Create Task
  async createTask(userId: string, data: any) {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        // Ensure Enums are used correctly
        priority: (data.priority as Priority) || Priority.MEDIUM,
        status: Status.TODO,
        // Convert date string to Date object
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        userId: userId,
        assignedToId: data.assignedToId || null,
      },
    });
  }

  // Get All Tasks (Optional helper)
  async findAll() {
    return await prisma.task.findMany();
  }
}