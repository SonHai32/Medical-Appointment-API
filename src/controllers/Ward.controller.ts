import { ResponseMessage } from "./../types/ResponseMessage.type";
import { Ward } from "./../entity/Ward.entity";
import { WardDao } from "./../daos/Ward.dao";
import { Request, Response } from "express";
import statusCodes from "http-status-codes";

const { BAD_REQUEST, OK } = statusCodes;
const wardDao = new WardDao();

export const _getAll = async (req: Request, res: Response) => {
  try {
    const districtId: string | undefined = req.query.districtId as string;
    const result: Ward[] | undefined = await wardDao.getAll(districtId);
    if (result) {
      res.status(OK).json({ data: result });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
