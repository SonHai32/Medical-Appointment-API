import { District } from "../entity/District.entity";
import { DistrictDao } from "./../daos/District.dao";
import statusCodes from "http-status-codes";
import { Request, Response } from "express";

const { BAD_REQUEST, OK } = statusCodes;
const districtDao = new DistrictDao();

export const _getAll = async (req: Request, res: Response) => {
  try {
    const provinceId: string | undefined = req.query.provinceId as string;
    const districts: District[] | undefined = await districtDao.getAll(
      provinceId
    );
    if (districts) {
      res.status(OK).json({ data: districts });
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
