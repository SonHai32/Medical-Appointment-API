import { UpdateResult } from "typeorm";
import { Request, Response } from "express";
import { PatientRecordDao } from "../daos/PatientRecord.dao";
import statusCodes from "http-status-codes";
import { PatientRecord } from "../entity/PatientRecord.entity";
import { ResponseMessage } from "../types/ResponseMessage.type";

const { BAD_REQUEST, OK } = statusCodes;
const patientRecordDao = new PatientRecordDao();

export const _add = async (req: Request, res: Response) => {
  try {
    const patientRecord: PatientRecord = req.body;

    const saved = await patientRecordDao.add(patientRecord);
    if (saved) {
      console.log(saved);
      res.status(OK).json({
        message: `New PatientRecord was added by ${saved.user.username}`,
      });
    } else {
      throw new Error("PatientRecord was not add");
    }
  } catch (error) {
    console.log(error);
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _getOne = async (req: Request, res: Response) => {
  try {
    const id = req.body.id || req.query.id || req.params.id;
    const record: PatientRecord | undefined = await patientRecordDao.getOne(id);
    if (record) {
      res.status(OK).json({ data: record });
    } else {
      throw new Error("Patient record not found");
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _update = async (req: Request, res: Response) => {
  try {
    const patientRecord: PatientRecord = req.body.patientRecord;
    const record: UpdateResult | undefined = await patientRecordDao.update(
      patientRecord
    );
    if (record) {
      res.status(OK).json({
        message: `Patient record - ${
          patientRecord.firstName +
          patientRecord.middleName +
          patientRecord.lastName
        }`,
      });
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _getAll = async (req: Request, res: Response) => {
  try {
    const result: PatientRecord[] | undefined = await patientRecordDao.getAll();
    if (result) {
      res.status(OK).json(result);
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
