import sequelize from "../src/sequelize";
import { spawn } from "child_process";
export default async () => {
  await sequelize.sync({ force: true });
  await sequelize.models.User.update({ balance: 10000 }, { where: { id: 1 } });

  const server = spawn("npm", ["run", "start:dev"], { stdio: "inherit" });
  server.on("exit", (code) => {
    if (code !== 0) {
      throw new Error(`Server exited with code ${code}`);
    }
  });
  global.server = server;

  await new Promise((resolve) => setTimeout(resolve, 3000));
};
