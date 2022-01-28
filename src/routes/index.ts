import { Express, Request, Response } from "express";
import { createUserHandler, getUserHandler, getUsersHandler } from "./users";

export default function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.get("/api/users", (req, res) => getUsersHandler(req, res));

  app.get("/api/users/:id", (req, res) => getUserHandler(req, res));

  app.post("/api/users", (req, res) => createUserHandler(req, res));
}
