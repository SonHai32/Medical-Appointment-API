import { DeleteResult, UpdateResult } from "typeorm";
import { Hospital } from "./../entity/Hospital.entity";
import { HospitalDao } from "./../daos/Hospital.dao";
import statusCodes from "http-status-codes";
import { Request, Response } from "express";
import { ResponseMessage } from "../types/ResponseMessage.type";

const { BAD_REQUEST, OK } = statusCodes;
const hospitalDao = new HospitalDao();

export const _getOne = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id || req.params.id || req.query.id;
    const relations: string = req.query.relations || req.body.relations || req.params.relations
    const relationsStringToArray: string[] | undefined = relations.split(',')
    const hospital: Hospital | undefined = await hospitalDao.getOne(id, relationsStringToArray);
    if (hospital) {
      res.status(OK).json({ data: hospital });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _getAll = async (req: Request, res: Response) => {
  try {
    const hospital: Hospital[] | undefined = await hospitalDao.getAll();
    if (hospital) {
      res.status(OK).json({ data: hospital });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _add = async (req: Request, res: Response) => {
  try {
    const newHospital: Hospital = req.body.data;
    const result: Hospital | undefined = await hospitalDao.add(newHospital);
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
    const hospital: Hospital = req.body.data;
    const result: UpdateResult | undefined = await hospitalDao.update(hospital);
    console.log('udate', result);
    if (result) {
      res.status(OK).json({ message: ResponseMessage.UPDATE_SUCCESS });
    } else {
      throw new Error(ResponseMessage.UPDATE_FAIL);
    }
  } catch (error) {
    console.log(error);
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _delete = async (req: Request, res: Response) => {
  try {
    const listID: string[] = req.body.data;
    const result: DeleteResult | undefined = await hospitalDao.delete(listID);
    if (result) {
      res.status(OK).json({ message: ResponseMessage.DELETE_SUCCESS });
    } else {
      throw new Error(ResponseMessage.DELETE_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
