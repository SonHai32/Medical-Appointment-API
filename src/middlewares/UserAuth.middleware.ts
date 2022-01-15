import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpStatusCodes from "http-status-codes";

const { UNAUTHORIZED } = httpStatusCodes;

export const userAuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.split(" ")[1];
      if (!token) res.sendStatus(UNAUTHORIZED);
      if (token && process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET, (error: any, data: any) => {
          if (error) res.sendStatus(UNAUTHORIZED);
          if (data) {
            req.body.accessToken = data;
            return next();
          } else return res.sendStatus(UNAUTHORIZED);
        });
      } else {
        throw new Error("ERROR");
      }
    } else res.status(UNAUTHORIZED);
  } catch (error) {
    res.sendStatus(UNAUTHORIZED);
  }
};
