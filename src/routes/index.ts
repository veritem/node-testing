import { Express, Request, Response } from "express";
import client from "../client";

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
}
