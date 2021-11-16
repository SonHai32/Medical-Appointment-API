import {
  deleteUsers,
  getAllUser,
  getUserDetail,
  userLogin,
} from "./../dals/User.dal";
import { getRepository, InsertResult, UpdateResult } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "./../entity/User.entity";
import { Request, Response } from "express";
import { Role } from "../entity/Role.entity";
import statusCodes from "http-status-codes";
import {
  insertUser,
  updateUserDetail,
  updateUserPassword,
} from "../dals/User.dal";

const { BAD_REQUEST, OK, FORBIDDEN } = statusCodes;

export const _insertUser = async (req: Request, res: Response) => {
  try {
    const { fullname, phoneNumber, emailAddress, username, password } =
      req.body;
    const role = await getRepository(Role)
      .createQueryBuilder("role")
      .where("role.id =:id", { id: 1 })
      .getOne();
    if (role) {
      bcrypt.hash(
        password,
        Number(process.env.SALT_ROUND) | 10,
        async (err: Error | undefined, encrypted: string) => {
          if (err) {
            throw err;
          } else {
            const user = new User(
              fullname,
              phoneNumber,
              emailAddress,
              username,
              encrypted,
              role
            );
            const result: InsertResult | undefined = await insertUser(user);
            if (result) {
              res
                .status(200)
                .json({ status: "SUCCESS", result: "Insert successfully" });
            }
          }
        }
      );
    } else throw new Error("role not found in database");
  } catch (error) {
    res.status(401).json({ status: "FAIL", message: (error as Error).message });
  }
};

export const _updateUserDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullname, phoneNumber, emailAddress, id } = req.body;
    const result: UpdateResult = await updateUserDetail(
      fullname,
      emailAddress,
      phoneNumber,
      id
    );
    res.status(OK).json({ status: "SUCCESS", message: "success" });
  } catch (error) {
    res
      .status(BAD_REQUEST)
      .json({ status: "FAIL", message: (error as Error).message });
  }
};

export const _updateUserPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, password } = req.body;
    if (id && password) {
      bcrypt.hash(
        password,
        Number(process.env.SALT_ROUND) | 10,
        async (err: Error | undefined, encrypted: string) => {
          if (err) {
            throw err;
          } else {
            const result: UpdateResult | undefined = await updateUserPassword(
              id,
              encrypted
            );
            if (result) {
              res.status(OK).json({
                status: "success",
                message: "Password has been changed",
              });
            } else {
              throw new Error("Fail to change password");
            }
          }
        }
      );
    } else {
      throw new Error("Missing propeties");
    }
  } catch (error) {}
};

export const _getAllUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users: User[] | undefined = await getAllUser();
    if (users) {
      res.status(OK).json({ status: "SUCCESS", users });
    } else {
      throw new Error("No user from database");
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: "FAIL",
      message: (error as Error).message,
    });
  }
};

export const _getUserDetail = async (req: Request, res: Response) => {
  try {
    const id = req.body.id || req.query.id || req.params.id;
    const user: User | undefined = await getUserDetail(id);
    if (user) {
      res.status(OK).json({ status: "SUCCESS", user });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res
      .status(BAD_REQUEST)
      .json({ status: "FAIL", message: (error as Error).message });
  }
};

/**
 *
 * @param req Client request
 * @param res Server response
 */
export const _deleteUsers = async (req: Request, res: Response) => {
  try {
    const listID: string[] = req.body.listID;
    const result = await deleteUsers(listID);
    if (result.affected) {
      res
        .status(OK)
        .json({ message: `${result.affected} users has been deleted` });
    } else {
      throw new Error("Fail to delete user");
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _userLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user: User | undefined = await userLogin(username, password);
    if (user) {
      res.status(OK).json({ user });
      // JWT Token will be add later
    } else {
      throw new Error("Login fail");
    }
  } catch (error) {
    res.status(FORBIDDEN).json({ message: (error as Error).message });
  }
};
