import "./pre-start";
import "reflect-metadata";
import app from "./server";
import logger from "./shared/logger.shared";
import { createConnection } from "typeorm";
const port = Number(process.env.PORT || 3000);
createConnection()
  .then((connection) => {
    app.listen(port, async () => {
      try {
        logger.info("Server is running on PORT " + port);
      } catch (error) {
        logger.err(error);
      }
    });
  })
  .catch((error) => {
    logger.err(error);
    process.exit(1)
  });
