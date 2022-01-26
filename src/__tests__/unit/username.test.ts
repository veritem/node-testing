import { validUsername } from "../../utils/checkUsername";

describe("Should return valid users", () => {
  it("return true for valid username", () => {
    expect(validUsername("veritem")).toBe(true);
  });
});
