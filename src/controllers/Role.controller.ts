import { RoleDao } from "./../daos/Role.dao";
import { Request, Response } from "express";
import statusCodes from "http-status-codes";
import { Role } from "src/entity/Role.entity";
import { ResponseMessage } from "src/types/ResponseMessage.type";

const { BAD_REQUEST, OK } = statusCodes;
const roleDao = new RoleDao();

export const _getAll = async (req: Request, res: Response) => {
  try {
    const result: Role[] | undefined = await roleDao.getAll();
    if (result) {
      res.json({ data: result });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

