import { User } from "./../entity/User.entity";
import { PatientRecord } from "./../entity/PatientRecord.entity";
import { DeleteResult, getRepository, UpdateResult } from "typeorm";

export interface IPatientRecordDao {
  add: (
    patientRecord: PatientRecord
  ) => Promise<PatientRecord | undefined> | undefined;
  getAll: (userID: string) => Promise<PatientRecord[]> | undefined;
  getOne: (userID: string) => Promise<PatientRecord | undefined>;
  update: (patientRecord: PatientRecord) => Promise<UpdateResult> | undefined;
  detete: (listID: string[]) => Promise<DeleteResult>;
}

export class PatientRecordDao implements IPatientRecordDao {
  add(patientRecord: PatientRecord): Promise<PatientRecord | undefined> {
    return getRepository(PatientRecord).save(patientRecord);
  }

  getAll(userID: string): Promise<PatientRecord[]> | undefined {
    return getRepository(PatientRecord).find({
      relations: ["user"],
      where: { userAccount: { id: userID } },
    });
  }

  getOne(id: string): Promise<PatientRecord | undefined> {
    return getRepository(PatientRecord).findOne({ id });
  }

  update(patientRecord: PatientRecord): Promise<UpdateResult> | undefined {
    return getRepository(PatientRecord).update(patientRecord.id, patientRecord);
  }

  detete(listID: string[]): Promise<DeleteResult> {
    return getRepository(PatientRecord).delete(listID);
  }
}
