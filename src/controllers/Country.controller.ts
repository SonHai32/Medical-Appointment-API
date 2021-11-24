import { Country } from "../entity/Country.entity";
import { Request, Response } from "express";
import { CountryDao } from "./../daos/Country.dao";
import statusCodes from "http-status-codes";
import { ResponseMessage } from "../types/ResponseMessage.type";

const { BAD_REQUEST, OK } = statusCodes;
const countryDao = new CountryDao();

export const _getAll = async (req: Request, res: Response) => {
  try {
    const country: Country[] | undefined = await countryDao.getAll();
    if (country) {
      res.status(OK).json({ data: country });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
