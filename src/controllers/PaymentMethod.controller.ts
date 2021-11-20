import { DeleteResult, UpdateResult } from "typeorm";
import { ResponseMessage } from "src/types/ResponseMessage.type";
import { PaymentMethod } from "./../entity/PaymentMethod.entity";
import { PaymentMethodDao } from "./../daos/PaymentMethod.dao";
import { Request, Response } from "express";
import statusCodes from "http-status-codes";

const { BAD_REQUEST, OK } = statusCodes;
const paymentMethodDao = new PaymentMethodDao();

export const _getAll = async (req: Request, res: Response) => {
  try {
    const result: PaymentMethod[] | undefined = await paymentMethodDao.getAll();
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
    const result: PaymentMethod | undefined = await paymentMethodDao.getOne(id);
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
    const newPaymentMethod: PaymentMethod = req.body.data;
    const result: PaymentMethod | undefined = await paymentMethodDao.add(
      newPaymentMethod
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
    const paymentMethod: PaymentMethod = req.body.data;
    const result: UpdateResult | undefined = await paymentMethodDao.update(
      paymentMethod
    );
    if (result?.affected && result.affected > 0) {
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
    const result: DeleteResult | undefined = await paymentMethodDao.delete(
      listID
    );
    if (result?.affected && result.affected > 0) {
      res.status(OK).json({ message: ResponseMessage.DELETE_SUCCESS });
    } else {
      throw new Error(ResponseMessage.DELETE_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
