import express from "express";
import balanceRouter from "./routes/balance";
import swaggerUi from "swagger-ui-express";
import * as yaml from "js-yaml";
import * as path from "path";
import * as fs from "fs";
import { AddressInfo } from "net";

export default async function bootstrap() {
  const app = express();

  // Swagger setup
  const swaggerPath = path.join(__dirname, "..", "swagger", "swagger.yaml");
  const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, "utf8"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(express.json());
  app.use("/api", balanceRouter);

  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    const address = server.address() as AddressInfo;
    console.log(`Server running at ${address.address}:${address.port}`);
    console.log(`Swagger UI: http://localhost:${address.port}/api-docs`);
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
}

bootstrap();
