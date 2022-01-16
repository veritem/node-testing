import supatest from "supertest"
import createServer from "../../src/utils/app"

describe("check test env", () => {
  test("should be true", async () => {
    const app = createServer();

    await supatest(createServer()).get("/healthcheck").expect(200);
  });
});
