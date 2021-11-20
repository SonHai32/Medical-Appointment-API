import { DeleteResult, UpdateResult } from "typeorm";
import { ResponseMessage } from "src/types/ResponseMessage.type";
import { Doctor } from "./../entity/Doctor.entity";
import { DoctorDao } from "./../daos/Doctor.dao";
import statusCodes from "http-status-codes";
import { Request, Response } from "express";

const { BAD_REQUEST, OK } = statusCodes;
const doctorDao = new DoctorDao();

export const _getAll = async (req: Request, res: Response) => {
  try {
    const doctors: Doctor[] | undefined = await doctorDao.getAll();
    if (doctors) {
      res.status(OK).json({ data: doctors });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _getOne = async (req: Request, res: Response) => {
  try {
    const id = req.body.id || req.query.id || req.params.id;
    const doctor: Doctor | undefined = await doctorDao.getOne(id);
    if (doctor) {
      res.status(OK).json({ data: doctor });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _add = async (req: Request, res: Response) => {
  try {
    const newDoctor: Doctor = req.body.data;
    const savedDoctor: Doctor | undefined = await doctorDao.add(newDoctor);
    if (savedDoctor) {
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
    const doctor: Doctor = req.body.data;
    const result: UpdateResult | undefined = await doctorDao.update(doctor);
    if (result?.raw) {
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
    const listID: string[] = req.body.data;
    const result: DeleteResult | undefined = await doctorDao.delete(listID);
    if (result?.affected && result.affected > 0) {
      res.status(OK).json({ message: ResponseMessage.DELETE_SUCCESS });
    } else {
      throw new Error(ResponseMessage.DELETE_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
