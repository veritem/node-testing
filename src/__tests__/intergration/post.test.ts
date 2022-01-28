import faker from "@faker-js/faker"
import { request } from "undici"
import { createTestServer } from "../../utils/test-utils"

const { serverURL, prisma } = createTestServer();

const postStructure = {
  id: expect.any(Number),
  title: expect.any(String),
  content: expect.any(String),
  authorId: expect.any(Number),
};

beforeAll(async () => {
  await prisma.post.create({
    data: {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: 1,
    },
  });

  console.log("✨ inserted Posts into database");
});

describe("Post API", () => {
  describe("GET /api/posts", () => {
    it("Should return posts", async () => {
      const { statusCode, body, headers } = await request(`${serverURL}/api/posts`);

      const respData = await body.json();


      expect(headers["content-type"]).toMatch(/application\/json/);


      expect(statusCode).toBe(200);

      for (const posts of respData) {
        expect(posts).toMatchObject(postStructure);
      }
    });
  });

  describe("POST /api/posts", () => {
    it("Should create Post", async () => {

      const { statusCode, body } = await request(`${serverURL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: faker.lorem.paragraph(),
          title: faker.lorem.sentence(),
          authorId: 1,
        }),
      });

      const respData = await body.json();

      expect(statusCode).toBe(201);
      expect(typeof respData).toBe("object");
    });
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
