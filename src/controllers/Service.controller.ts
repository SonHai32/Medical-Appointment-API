import { ServiceDao } from "./../daos/Service.dao";
import { Service } from "./../entity/Service.entity";
import { Request, Response } from "express";
import statusCodes from "http-status-codes";
import { ResponseMessage } from "../types/ResponseMessage.type";

const { OK, BAD_REQUEST } = statusCodes;
const serviceDao = new ServiceDao();

export const _add = async (req: Request, res: Response) => {
  try {
    const service: Service = req.body.data;
    if (service) {
      const result: Service | undefined = await serviceDao.add(service);
      if (result) {
        res.status(OK).json({ message: ResponseMessage.INSERT_SUCCESS });
      } else {
        throw new Error(ResponseMessage.INSERT_FAIL);
      }
    } else {
      throw new Error(ResponseMessage.MISSING_REQUESR_DATA);
    }
  } catch (error) {
    res.status(BAD_REQUEST).send((error as Error).message);
  }
};
