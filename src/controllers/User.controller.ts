import { UpdateResult } from "typeorm";
import { User } from "./../entity/User.entity";
import { Request, Response } from "express";
import statusCodes from "http-status-codes";
import { UserDao } from "../daos/User.dao";
import { ResponseMessage } from "../types/ResponseMessage.type";

const { BAD_REQUEST, OK, FORBIDDEN } = statusCodes;
const userDao = new UserDao();

export const _register = async (req: Request, res: Response) => {
  try {
    const newUser: User = req.body.data;
    const result: User | undefined = await userDao.register(newUser);
    if (result) {
      res
        .status(200)
        .json({ status: "SUCCESS", result: "Insert successfully" });
    }
  } catch (error) {
    res.status(401).json({ status: "FAIL", message: (error as Error).message });
  }
};

export const _update = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = req.body;
    const result: User | undefined = await userDao.update(user);
    if (result) {
      res.status(OK).json({ status: "SUCCESS", message: "success" });
    } else {
      throw new Error("Update fail");
    }
  } catch (error) {
    res.status(BAD_REQUEST).send((error as Error).message);
  }
};

export const _updateUserPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, oldPassword, newPassword } = req.body.data;
    const result: UpdateResult | undefined = await userDao.changePassword(
      username,
      oldPassword,
      newPassword
    );
    if (result) {
      res
        .status(OK)
        .json({ message: ResponseMessage.UPDATE_SUCCESS, status: "SUCCESS" });
    } else {
      throw new Error(ResponseMessage.UPDATE_FAIL);
    }
  } catch (error) {
    res
      .status(BAD_REQUEST)
      .json({ message: (error as Error).message, status: "FAIL" });
  }
};

export const _getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] | undefined = await userDao.getAll();
    if (users) {
      res.status(OK).json(users);
    } else {
      throw new Error("No user from database");
    }
  } catch (error) {
    res.status(BAD_REQUEST).send((error as Error).message);
  }
};

export const _getOne = async (req: Request, res: Response) => {
  try {
    const id = req.body.id || req.query.id || req.params.id;
    const user: User | undefined = await userDao.getOne(id);
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
export const _delete = async (req: Request, res: Response) => {
  try {
    const listID: string[] = req.body.listID;
    const result = await userDao.delete(listID);
    if (result) {
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

export const _login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user: User | undefined = await userDao.login(username, password);
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

export const addPatientRecord = async (req: Request, res: Response) => {
  try {
    // const user = req.body.user
    // const patientRecord
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
