import { DeleteResult, UpdateResult } from "typeorm";
import { ResponseMessage } from "../types/ResponseMessage.type";
import { DoctorAccount } from "./../entity/DoctorAccount.entity";
import { Request, Response } from "express";
import { DoctorAccountDao } from "./../daos/DoctorAccount.dao";
import statusCodes from "http-status-codes";

const { BAD_REQUEST, OK } = statusCodes;
const doctorAccountDao = new DoctorAccountDao();

export const _getOne = async (req: Request, res: Response) => {
  try {
    const id = req.body.id || req.query.id || req.params.id;
    const account: DoctorAccount | undefined = await doctorAccountDao.getOne(
      id
    );
    if (account) {
      res.status(OK).json({ data: account });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _getAll = async (req: Request, res: Response) => {
  try {
    const accounts: DoctorAccount[] | undefined =
      await doctorAccountDao.getAll();
    if (accounts) {
      res.status(OK).json({ data: accounts });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result: DoctorAccount | undefined = await doctorAccountDao.login(
      username,
      password
    );
    if (result) {
      res.status(OK).json({ jwt: "jwt" }); // add jwt later
    } else {
      throw new Error(ResponseMessage.LOGIN_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _register = async (req: Request, res: Response) => {
  try {
    const newAccount: DoctorAccount = req.body.data;
    const result = await doctorAccountDao.register(newAccount);
    if (result) {
      res.status(OK).json({ jwt: "jwt" }); //add jwt later
    } else {
      throw new Error(ResponseMessage.LOGIN_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _delete = async (req: Request, res: Response) => {
  try {
    const listID: string[] = req.body.data;
    const result: DeleteResult | undefined = await doctorAccountDao.delete(
      listID
    );
    if (result) {
      res.status(OK).json({ message: ResponseMessage.DELETE_SUCCESS });
    } else {
      throw new Error(ResponseMessage.DELETE_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _disable = async (req: Request, res: Response) => {
  try {
    const listID: string[] = req.body.data;
    const result: UpdateResult | undefined = await doctorAccountDao.disable(
      listID
    );
    if (result) {
      res.status(OK).json({ message: ResponseMessage.UPDATE_SUCCESS });
    } else {
      throw new Error(ResponseMessage.UPDATE_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
