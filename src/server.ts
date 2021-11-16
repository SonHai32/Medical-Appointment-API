import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import express, { Request, Response, NextFunction } from "express";
import statusCodes from "http-status-codes";
import { cookieProps } from "./shared/constants.shared";
import logger from "./shared/logger.shared";
import router from "./routers/index.router";

const app = express();
const { BAD_REQUEST } = statusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json()), app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieProps.secret));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use("/api", router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(error, true);
  return res.status(BAD_REQUEST).json({
    error: error.message,
  });
});

export default app;
