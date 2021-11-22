import { Nation } from "./../entity/Nation.entity";
import { NationDao } from "./../daos/Nation.dao";
import statusCodes from "http-status-codes";
import { Request, Response } from "express";
import { ResponseMessage } from "../types/ResponseMessage.type";

const { BAD_REQUEST, OK } = statusCodes;
const nationDao = new NationDao();

export const _getAll = async (req: Request, res: Response) => {
  try {
    const result: Nation[] | undefined = await nationDao.getAll();
    if (result) {
      res.status(OK).json({ data: result });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
