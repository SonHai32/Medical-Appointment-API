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
  async add(patientRecord: PatientRecord): Promise<PatientRecord | undefined> {
    const existedCitizenIdentification = await getRepository(
      PatientRecord
    ).findOne({
      where: { citizenIdentification: patientRecord.citizenIdentification },
    });
    if (!existedCitizenIdentification) {
      return getRepository(PatientRecord).save(patientRecord);
    }
    throw new Error("CMND/CCCD Đã tồn tại");
  }

  getAll(): Promise<PatientRecord[]> | undefined {
    return getRepository(PatientRecord).find({
      relations: ["gender", "ward", "ward.district", "ward.district.province"],
    });
  }

  getOne(id: string): Promise<PatientRecord | undefined> {
    return getRepository(PatientRecord).findOne({ id });
  }

  update(patientRecord: PatientRecord): Promise<UpdateResult> | undefined {
    return getRepository(PatientRecord)
      .createQueryBuilder()
      .update(patientRecord)
      .execute();
  }

  detete(listID: string[]): Promise<DeleteResult> {
    return getRepository(PatientRecord).delete(listID);
  }

  deleteOne(id: string): Promise<DeleteResult> {
    return getRepository(PatientRecord).delete({ id });
  }
}
