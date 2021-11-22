import { DeleteResult, UpdateResult } from "typeorm";
import { PatientScheduleDao } from "./../daos/PatientSchedule.dao";
import { PatientSchedule } from "./../entity/PatientSchedule.entity";
import { Request, Response } from "express";
import statusCode from "http-status-codes";
import { ResponseMessage } from "../types/ResponseMessage.type";

const { BAD_REQUEST, OK } = statusCode;
const patientScheduleDao = new PatientScheduleDao();

export const _getOne = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id || req.query.id || req.params.id;
    const result: PatientSchedule | undefined = await patientScheduleDao.getOne(
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

export const _getAll = async (req: Request, res: Response) => {
  try {
    const result: PatientSchedule[] | undefined =
      await patientScheduleDao.getAll();
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _add = async (req: Request, res: Response) => {
  try {
    const newPatientSchedule = req.body.data;
    const result: PatientSchedule | undefined = await patientScheduleDao.add(
      newPatientSchedule
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
    const patientSchedule: PatientSchedule = req.body.data;
    const result: UpdateResult | undefined = await patientScheduleDao.update(
      patientSchedule
    );
    if (result) {
      res.status(OK).json({ message: ResponseMessage.UPDATE_SUCCESS });
    } else {
      throw new Error(ResponseMessage.UPDATE_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _delete = async (req: Request, res: Response) => {
  try {
    const listID: string[] = req.body.id;
    const result: DeleteResult | undefined = await patientScheduleDao.delete(
      listID
    );
    if (result) {
      res.status(OK).json({ message: ResponseMessage.DELETE_SUCCESS });
    } else {
      throw new Error(ResponseMessage.DELETE_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
