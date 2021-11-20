import { PatientRecord } from './../entity/PatientRecord.entity';
import { PatientRetriveDao } from "./../daos/PatientRelative.dao";
import { Request, Response } from "express";
import statusCode from "http-status-codes";
import { PatientRelative } from 'src/entity/PatientRelative.entity';

const { BAD_REQUEST, OK } = statusCode;
const patientRelativeDao = new PatientRetriveDao();

// export const _getOne = async (req: Request, res: Response) => {
//   try {
//     const id: string = req.body.id || req.query.id || req.params.id;
//     const result: PatientRelative | undefined = await patientRelativeDao
//   } catch (error) {
//     res.status(BAD_REQUEST).json({ message: (error as Error).message });
//   }
// };
