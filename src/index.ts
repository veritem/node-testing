import app from "./utils/app";

const server = app();

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
