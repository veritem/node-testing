import { Request, Response } from "express";
import { prisma } from "./../index";

export async function createUserHandler(req: Request, res: Response) {
  const { name, email, username } = req.body;

  if (!name || !email) {
    return res.status(400).send({
      message: "Name and email are required",
    });
  }
  try {
    let user = await prisma.user.create({ data: { name, email, username } });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  const users = await prisma.user.findMany();

  res.json(users);
}
