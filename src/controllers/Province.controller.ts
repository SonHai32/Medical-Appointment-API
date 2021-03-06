import { ResponseMessage } from "./../types/ResponseMessage.type";
import { ProvinceDao } from "./../daos/Province.dao";
import { Request, Response } from "express";
import statusCodes from "http-status-codes";
import { Province } from "../entity/Province.entity";

const { BAD_REQUEST, OK } = statusCodes;
const provinceDao = new ProvinceDao();

export const _getAll = async (req: Request, res: Response) => {
  try {
    const countryId: string | undefined = req.query.countryId as string;
    const result: Province[] | undefined = await provinceDao.getAll(countryId);
    if (result) {
      res.status(OK).json(result);
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
