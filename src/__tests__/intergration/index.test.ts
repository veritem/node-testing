import supertest from "supertest"
import app from "../../utils/app"


describe("check test env", () => {
  test("should be true", async () => {
    // const app = createServer();


     await supertest(app()).get("/healthcheck")
  });
});
