import { Request, Response } from "express"
import prisma from "../client"

export async function createUserHandler(req: Request, res: Response) {
  const { name, email, username } = req.body;

  if (!name || !email) {
    return res.status(400).send({
      message: "Name and email are required",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if(user) {
    return res.status(400).send({
      message: "User already exists",
    });
  }


  try {
    let user = await prisma.user.create({ data: { name, email, username } });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  const users = await prisma.user.findMany();

  res.json(users);
}


export async function getUserHandler(req: Request, res: Response) {
  const { id } = req.params;

  if(!id) {
    return res.status(400).send({
      message: "Id is required"
    })
  }

  const user = await prisma.user.findFirst({
    where: { id: parseInt(id) },
  });

  if(!user) {
    return res.status(404).send({
      message: "User not found"
    })
  }

  res.json(user);
}
