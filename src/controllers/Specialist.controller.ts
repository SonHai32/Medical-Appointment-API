import { DeleteResult, UpdateResult } from "typeorm";
import { ResponseMessage } from "./../types/ResponseMessage.type";
import { Specialist } from "./../entity/Specialist.entity";
import { SpecialistDao } from "./../daos/Specialist.dao";
import { Request, Response } from "express";
import statusCodes from "http-status-codes";

const { BAD_REQUEST, OK } = statusCodes;
const specialistDao = new SpecialistDao();

export const _getALl = async (req: Request, res: Response) => {
  try {
    const result: Specialist[] | undefined = await specialistDao.getAll();
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
    const result: Specialist | undefined = await specialistDao.getOne(id);
    if (result) {
      res.status(OK).json({ data: result });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _add = async (req: Request, res: Response) => {
  try {
    const newSpecialist: Specialist = req.body.data;
    const result: Specialist | undefined = await specialistDao.add(
      newSpecialist
    );
    if (result) {
      res.status(OK).json({ message: ResponseMessage.INSERT_SUCCESS });
    } else {
      throw new Error(ResponseMessage.INSERT_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _update = async (req: Request, res: Response) => {
  try {
    const specialist: Specialist = req.body.data;
    const result: UpdateResult | undefined = await specialistDao.update(
      specialist
    );
    if (result?.affected && result.affected > 0) {
      res.status(OK).json({ message: ResponseMessage.UPDATE_SUCCESS });
    } else {
      throw new Error(ResponseMessage.UPDATE_SUCCESS);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _delete = async (req: Request, res: Response) => {
  try {
    const listID: string[] = req.body.data;
    const result: DeleteResult | undefined = await specialistDao.delete(listID);
    if (result?.affected && result.affected > 0) {
      res.status(OK).json({ message: ResponseMessage.DELETE_SUCCESS });
    } else {
      throw new Error(ResponseMessage.DELETE_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
