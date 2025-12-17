import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
      },
    });

    return res.status(201).json({ message: "User registered" });

  } catch (error: any) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: error?.message || "Internal server error",
    });
  }
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await comparePassword(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: user.id });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json({
    access_token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};


export const logout = (_: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
