import sequelize from "../src/sequelize";
import { User } from "../src/models/User";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.validateStatus = () => true;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await sequelize.models.User.create({ balance: 100 });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Balance API Test", () => {
  describe("POST /api/update-balance", () => {
    it("should handle concurrent requests correctly", async () => {
      const requests = Array(100)
        .fill(0)
        .map(() =>
          axios.patch("/api/update-balance", {
            userId: 1,
            amount: -2,
          })
        );
      const results = await Promise.allSettled(requests);

      const successes = results.filter(
        (r) => r.status === "fulfilled" && r.value.status === 200
      );
      const errors = results.filter(
        (r) =>
          r.status === "fulfilled" &&
          r.value.status === 400 &&
          r.value.data.error === "Insufficient funds"
      );

      expect(successes.length).toBe(50);
      expect(errors.length).toBe(50);

      const user = await User.findByPk(1);
      expect(user?.balance).toBe(0);
    });
  });
});
