import { SpecialistPriceDao } from "./../daos/SpecialistPrice.dao";
import { Request, Response } from "express";
import statusCodes from "http-status-codes";
import { SpecialistPrice } from "src/entity/SpecialistPrice.entity";
import { ResponseMessage } from "src/types/ResponseMessage.type";

const { BAD_REQUEST, OK } = statusCodes;
const specialistPriceDao = new SpecialistPriceDao();

export const _getAll = async (req: Request, res: Response) => {
  try {
    const result: SpecialistPrice[] | undefined =
      await specialistPriceDao.getAll();
    if (result) {
      res.status(OK).json({ data: result });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _getOne = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id || req.query.id || req.params.id;
    const result: SpecialistPrice | undefined = await specialistPriceDao.getOne(
      id
    );
    if (result) {
      res.status(OK).json({ data: result });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
