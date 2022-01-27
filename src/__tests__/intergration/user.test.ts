import faker from "@faker-js/faker"
import { request } from "undici"
import { createTestServer } from "../../utils/test-utils"

const { serverURL, prisma } = createTestServer();

beforeAll(async () => {
  await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    },
  });

  console.log("✨ inserted users into database");
});

describe("User API", () => {
  describe("GET /api/users", () => {
    it("Should return users", async () => {
      const { statusCode, body } = await request(`${serverURL}/api/users`);

      const respData = await body.json();

      expect(statusCode).toBe(200);
      expect(typeof respData).toBe("object");
    });
  });

  describe("GET /api/users/{id}", () => {
    it("Should return user", async () => {
      const { statusCode, body } = await request(`${serverURL}/api/users/3`);

      const respData = await body.json();


      expect(statusCode).toBe(200);
      expect(typeof respData).toBe("object");
    });


    it("Should return 404 if user not found", async () => {
      const { statusCode } = await request(`${serverURL}/api/users/200000`);

      expect(statusCode).toBe(404);

  });
  });


  describe("POST /api/users", () => {
    it.skip("Should fail if user exists", async () => {
      const first = await request(`${serverURL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "test",
          email: "yeee@yo.dev",
          username: "yeee",
        }),
      });

      const { statusCode, body
      } = await request(`${serverURL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "test",
          email: "yeee@yo.dev",
          username: "yeee",
        }),
      });


      const respData = await body.json();


      expect(statusCode).toBe(201);
      expect(typeof respData).toBe("object");
    });
  });

});

afterAll(async () => {
  // const deleteUsers = prisma.user.deleteMany();

  // await prisma.$transaction([deleteUsers]);

  await prisma.$disconnect();
});
