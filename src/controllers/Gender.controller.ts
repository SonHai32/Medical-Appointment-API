import { ResponseMessage } from "../types/ResponseMessage.type";
import { Gender } from "../entity/Gender.entity";
import { GenderDao } from "./../daos/Gender.dao";
import statusCodes from "http-status-codes";
import { Request, Response } from "express";

const { BAD_REQUEST, OK } = statusCodes;
const genderDao = new GenderDao();

export const _getALl = async (req: Request, res: Response) => {
  try {
    const genders: Gender[] | undefined = await genderDao.getAll();
    if (genders) {
      res.status(OK).json(genders);
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
