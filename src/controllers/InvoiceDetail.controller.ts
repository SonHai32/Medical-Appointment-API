import { InvoiceDetail } from "./../entity/InvoiceDetail.entity";
import { Request, Response } from "express";
import { InvoiceDetailDao } from "./../daos/InvoiceDetail.dao";
import statusCodes from "http-status-codes";
import { ResponseMessage } from "../types/ResponseMessage.type";

const { BAD_REQUEST, OK } = statusCodes;
const invoiceDetailDao = new InvoiceDetailDao();

export const _add = async (req: Request, res: Response) => {
  try {
    const newInvoiceDetail: InvoiceDetail = req.body.data;
    const result: InvoiceDetail | undefined = await invoiceDetailDao.add(
      newInvoiceDetail
    );
    if (result) {
      res.status(OK).json({ message: ResponseMessage.INSERT_SUCCESS });
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _getAll = async (req: Request, res: Response) => {
  try {
    const result: InvoiceDetail[] | undefined = await invoiceDetailDao.getAll();
    if (result) {
      res.status(OK).json({ data: result });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
