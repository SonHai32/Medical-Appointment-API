import { RefreshTokenDao } from "../daos/RefreshToken.dao";
import { User } from "../entity/User.entity";
import { UserDao } from "../daos/User.dao";
import { Request, Response } from "express";
import httpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

const { BAD_REQUEST, OK, UNAUTHORIZED } = httpStatusCodes;

const userDao = new UserDao();
const refreshTokenDao = new RefreshTokenDao();

export const _login = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (password && username) {
      const loginResult = await userDao.login(username, password);
      if (loginResult) {
        const accessToken = getUserToken(loginResult, "ACCESS_TOKEN");
        const refreshToken = getUserToken(loginResult, "REFRESH_TOKEN");
        const saveTokenResult = await refreshTokenDao.save(refreshToken);
        if (saveTokenResult) {
          responseToken(res, accessToken, refreshToken, "BOTH");
        } else {
          throw new Error("Can not to save refresh token");
        }
      }
    } else {
      throw new Error("Missing username or password");
    }
  } catch (error) {
    res.status(UNAUTHORIZED).json({ message: (error as Error).message });
  }
};

export const _register = async (req: Request, res: Response) => {
  try {
    const user: User = req.body.data;
    if (user) {
      const saveResult = await userDao.register(user);
      if (saveResult) {
        const accessToken = getUserToken(saveResult, "ACCESS_TOKEN");
        const refreshToken = getUserToken(saveResult, "REFRESH_TOKEN");
        const saveTokenResult = await refreshTokenDao.save(refreshToken);
        if (saveTokenResult) {
          responseToken(res, accessToken, refreshToken, "BOTH");
        } else {
          throw new Error("Can not to save refresh token");
        }
      }
    } else {
      throw new Error("Missing user");
    }
  } catch (error) {
    res.status(UNAUTHORIZED).json({ message: (error as Error).message });
  }
};

export const _getUserWithToken = async (req: Request, res: Response) => {
  try {
    const accessToken = req.body.accessToken;
    if (accessToken) {
      const user = await userDao.getOne(accessToken.id);
      if (user) {
        res.status(OK).json(user);
      } else {
        throw new Error("User does not exist");
      }
    } else {
      res.status(UNAUTHORIZED);
    }
  } catch (error) {
    res.status(UNAUTHORIZED).json({ message: (error as Error).message });
  }
};

export const _refreshToken = (req: Request, res: Response) => {
  try {
    const {refreshToken} = req.cookies;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (refreshToken && JWT_SECRET) {
      jwt.verify(refreshToken, JWT_SECRET, async (error: any, data: any) => {
        if (error) {
          res.status(UNAUTHORIZED).json({ message: error });
        } else {
          const user = await userDao.getOne(data.id);
          if (user) {
            const accessToken = getUserToken(user, "ACCESS_TOKEN");
            responseToken(res, accessToken, accessToken, "REFRESH");
          } else {
            throw new Error("User not found");
          }
        }
      });
    } else {
      throw new Error('not found token')
    }
  } catch (error) {
    res.status(UNAUTHORIZED).json({ message: error });
  }
};

const responseToken = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  type: "BOTH" | "REFRESH"
): void => {
  try {
    const TOKEN_EXP = process.env.JWT_TOKEN_EXP;
    const REFRESH_TOKEN_EXP = process.env.JWT_REFRESH_TOKEN_EXP;

    const getExpiresIn = (time: number): Date => {
      return new Date(new Date().getTime() + time);
    };

    if (TOKEN_EXP && REFRESH_TOKEN_EXP) {
      if (type === "BOTH") {
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          path: "/",
          expires: getExpiresIn(parseInt(REFRESH_TOKEN_EXP)),
        });
      }

      res.header("Access-Control-Allow-Origin", "http://localhost:4200");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");

      res.status(OK).json({
        accessToken: accessToken,
        expiresIn: getExpiresIn(parseInt(TOKEN_EXP)),
      });
    }
  } catch (error) {
    res.status(UNAUTHORIZED);
  }
};

const getUserToken = (
  user: User,
  type: "ACCESS_TOKEN" | "REFRESH_TOKEN"
): string => {
  const SECRET = process.env.JWT_SECRET;
  const TOKEN_EXP = process.env.JWT_TOKEN_EXP;
  const REFRESH_TOKEN_EXP = process.env.JWT_REFRESH_TOKEN_EXP;
  if (SECRET && TOKEN_EXP && REFRESH_TOKEN_EXP) {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: "USER",
      },
      SECRET,
      {
        expiresIn:
          type === "ACCESS_TOKEN" ? `${TOKEN_EXP}ms` : `${REFRESH_TOKEN_EXP}ms`,
      }
    );

    return token;
  } else {
    throw new Error("Missign jwt secret key");
  }
};
