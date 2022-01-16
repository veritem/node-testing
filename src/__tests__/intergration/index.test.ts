import supertest from "supertest";
import server from "../../utils/app";

const app = server();

describe("check test env", () => {
  test("should be true", async () => {
    const result = await supertest(app).get("/healthcheck");
    expect(result.status).toBe(200);
  });
});
