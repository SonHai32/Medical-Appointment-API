import { UpdateResult } from "typeorm";
import { getRepository } from "typeorm";
import { DeleteResult } from "typeorm";
import { PatientSchedule } from "./../entity/PatientSchedule.entity";
export interface IPatientScheduleDao {
  add: (
    patientSchedule: PatientSchedule
  ) => Promise<PatientSchedule> | undefined;
  update: (
    patientSchedule: PatientSchedule
  ) => Promise<UpdateResult> | undefined;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  getOne: (id: string) => Promise<PatientSchedule | undefined>;
  getAll: () => Promise<PatientSchedule[]> | undefined;
}

export class PatientScheduleDao implements IPatientScheduleDao {
  add(patientSchedule: PatientSchedule): Promise<PatientSchedule> {
    return getRepository(PatientSchedule).save(patientSchedule);
  }

  update(patientSchedule: PatientSchedule): Promise<UpdateResult> | undefined {
    return getRepository(PatientSchedule).update(
      { id: patientSchedule.id },
      patientSchedule
    );
  }

  delete(listID: string[]): Promise<DeleteResult> | undefined {
    return getRepository(PatientSchedule).delete(listID);
  }

  getOne(id: string): Promise<PatientSchedule | undefined> {
    return getRepository(PatientSchedule).findOne({ id });
  }

  getAll(): Promise<PatientSchedule[]> | undefined {
    return getRepository(PatientSchedule).find();
  }
}
