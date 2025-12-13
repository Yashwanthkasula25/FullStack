import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getProfile = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true },
  });

  res.json(user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name } = req.body;

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { name },
  });

  res.json({ message: "Profile updated", user });
};
