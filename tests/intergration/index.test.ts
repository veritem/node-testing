import supatest from "supertest"
import createServer from '../../src/utils/server'

describe("check test env", () => {
    test("should be true", async () => {

        const app = createServer()

        await (await supatest(app).get("/healthcheck").expect(200))
    });
})
