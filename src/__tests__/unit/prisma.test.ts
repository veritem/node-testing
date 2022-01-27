import client from "../../client";

describe("Setup prisma", () => {
  beforeAll(async () => {
    await client.$connect();
  });

  afterAll(async () => {
    await client.$disconnect();
  });

  test("should return something from db", async () => {
    const data = await client.user.findMany({ take: 1, select: { id: true } });
    expect(data).toBeTruthy();
  });
});
