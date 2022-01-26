import request from "supertest"
import prisma from "../../client"
import app from "../../utils/app"

beforeAll(async () => {
  await prisma.user.create({
    data: {
      email: "test1@test.com",
      name: "test",
      username: "test",
    },
  });

  console.log("✨ inserted users into database");
});

describe("User API", () => {
  describe("GET /api/users", () => {
    it("Should return users", async() => {
      await request(app)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        // .then((response) => {
        //   expect(response.body).toEqual([
        //     {
        //       id: expect.any(String),
        //       email: expect.any(String),
        //       name: expect.any(String),
        //       username: expect.any(String),
        //     },
        //   ]);
        });
    });
  });

  describe("GET /api/users/{id}", () => {
    it("Should return user", async () => {
      await request(app)
        .get("/api/users/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        // .then((response) => {
        //   expect(response.body).toEqual({
        //     id: expect.any(String),
        //     email: expect.any(String),
        //     name: expect.any(String),
        //     username: expect.any(String),
        //   });
        // });
    });
  });

  describe("POST /api/users", () => {
    it("Should create user", async() => {
      await request(app)
        .post("/api/users")
        .send({
          email: "tester@test.com",
          name: "tester",
          username: "tester",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        // .then((response) => {
        //   expect(response.body).toEqual({
        //     id: expect.any(String),
        //     email: expect.any(String),
        //     name: expect.any(String),
        //     username: expect.any(String),
        //   });
        // });
    // });
  });
});

afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany();

  await prisma.$transaction([deleteUsers]);

  await prisma.$disconnect();
});
