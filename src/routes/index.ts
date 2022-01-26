import { Express, Request, Response } from "express"
import client from "../client"

export default function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  // app.post("/api/users", createUserHandler);
  app.get("/api/users", async (req: Request, res: Response) => {
    const users = await client.user.findMany();
    res.json(users);
  });

  app.get("/api/users/:id", async (req: Request, res: Response) => {
    const user = await client.user.findFirst({
      where: { id: parseInt(req.params.id) },
    });
    res.json(user);
  });

  app.post("/api/users", async (req: Request, res: Response) => {
    const { name, email, username } = req.body;

    if (!name || !email) {
      return res.status(400).send({
        message: "Name and email are required",
      });
    }
    try {
      let user = await client.user.create({ data: { name, email, username } });
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send({
        message: "Something went wrong",
      });
    }
  });
}
