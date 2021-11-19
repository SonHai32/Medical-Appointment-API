import { UpdateResult } from "typeorm";
import { Request, Response } from "express";
import { AcademicRankDao } from "src/daos/AcademicRank.dao";
import { AcademicRank } from "src/entity/AcademicRank.entity";
import httpStatusCodes from "http-status-codes";
import { ResponseMessage } from "src/types/ResponseMessage.type";

const academicRankDao = new AcademicRankDao();
const { BAD_REQUEST, OK } = httpStatusCodes;

export const _getOne = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id || req.query.id || req.params.id;
    const academicRank: AcademicRank | undefined = await academicRankDao.getOne(
      id
    );
    if (academicRank) {
      res.status(OK).json({ data: academicRank });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _getAll = async (req: Request, res: Response) => {
  try {
    const listAcademicRank: AcademicRank[] | undefined =
      await academicRankDao.getAll();
    if (listAcademicRank) {
      res.status(OK).json({ data: listAcademicRank });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _update = async (req: Request, res: Response) => {
  try {
    const academicRank: AcademicRank = req.body.data;
    const result: UpdateResult | undefined = await academicRankDao.update(
      academicRank
    );
    if (result?.affected && result.affected > 0) {
      res.status(OK).json({ mesaage: "UPDATED" });
    } else {
      throw new Error("UPDATE FAIL");
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
