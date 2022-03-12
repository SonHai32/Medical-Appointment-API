import { DeleteResult, UpdateResult } from "typeorm";
import { Shift } from "./../entity/Shift.entitty";
import { Request, Response } from "express";
import statusCode from "http-status-codes";
import { ShiftDao } from "../daos/Shift.dao";
import { ResponseMessage } from "../types/ResponseMessage.type";

const { BAD_REQUEST, OK } = statusCode;
const shiftDao = new ShiftDao();

export const _getOne = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id || req.params.id || req.query.id;
    const result: Shift | undefined = await shiftDao.getOne(id);
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
    const result: Shift[] | undefined = await shiftDao.getAll();
    if (result) {
      res.status(OK).json(result);
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _add = async (req: Request, res: Response) => {
  try {
    const newShift: Shift = req.body.data;
    const result: Shift | undefined = await shiftDao.add(newShift);
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
    const shift: Shift = req.body.data;
    const result: UpdateResult | undefined = await shiftDao.update(shift);
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
    const listID: string[] = req.body.data;
    const result: DeleteResult | undefined = await shiftDao.delete(listID);
    if (result) {
      res.status(OK).json({ message: ResponseMessage.DELETE_SUCCESS });
    } else {
      throw new Error(ResponseMessage.DELETE_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
