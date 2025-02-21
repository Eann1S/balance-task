import sequelize from "../src/sequelize";

export default async () => {
  await sequelize.close();
  global.server.kill();
};
