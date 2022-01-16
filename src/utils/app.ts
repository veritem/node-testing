import express, { Express } from "express";
import routes from "../routes";

export default function app(): Express {
  const app = express();

  app.use(express.json());

  routes(app);

  return app;
}
