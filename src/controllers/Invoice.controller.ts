import { ResponseMessage } from "../types/ResponseMessage.type";
import { InvoiceDao } from "./../daos/Invoice.dao";
import { Invoice } from "./../entity/Invoice.entity";
import { Request, Response } from "express";
import statusCodes from "http-status-codes";

const { BAD_REQUEST, OK } = statusCodes;
const invoiceDao = new InvoiceDao();

export const _add = async (req: Request, res: Response) => {
  try {
    const newInvoice: Invoice = req.body.data;
    const result: Invoice | undefined = await invoiceDao.add(newInvoice);
    if (result) {
      res.status(OK).json({ message: ResponseMessage.INSERT_SUCCESS });
    } else {
      throw new Error(ResponseMessage.INSERT_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _getAll = async (req: Request, res: Response) => {
  try {
    const invoices: Invoice[] | undefined = await invoiceDao.getAll();
    if (invoiceDao) {
      res.status(OK).json({ data: invoices });
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};

export const _getOne = async (req: Request, res: Response) => {
  try {
    const id = req.body.id || req.query.id || req.params.id;
    const result: Invoice | undefined = await invoiceDao.getOne(id);
    if (result) {
      res.status(OK).json({ data: res });
    } else {
      throw new Error(ResponseMessage.GET_FAIL);
    }
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: (error as Error).message });
  }
};
