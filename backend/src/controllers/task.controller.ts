import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { CreateTaskDto, UpdateTaskDto } from "../dto/task.dto";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await TaskService.getTasks(req.user.id, req.query);
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const dto = CreateTaskDto.parse(req.body);
  const task = await TaskService.createTask(req.user.id, dto);
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const dto = UpdateTaskDto.parse(req.body);
  const task = await TaskService.updateTask(req.params.id, dto);
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  await TaskService.deleteTask(req.params.id);
  res.status(204).send();
};
