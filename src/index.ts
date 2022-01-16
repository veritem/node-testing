import { PrismaClient } from "@prisma/client";
import app from "./utils/app";

export const prisma = new PrismaClient();

const server = app();

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
