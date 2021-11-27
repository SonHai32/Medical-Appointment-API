import { getRepository } from "typeorm";
import { DeleteResult } from "typeorm";
import { UpdateResult } from "typeorm";
import { PatientRelative } from "../entity/PatientRelative.entity";

export interface IPatientRelativeDao {
  add: (
    patientRelative: PatientRelative
  ) => Promise<PatientRelative> | undefined;
  update: (
    PatientRelative: PatientRelative
  ) => Promise<UpdateResult> | undefined;
  delete: (id: string) => Promise<DeleteResult> | undefined;
}

export class PatientRetriveDao implements IPatientRelativeDao {
  public add(
    patientRelative: PatientRelative
  ): Promise<PatientRelative> | undefined {
    return getRepository(PatientRelative).save(patientRelative);
  }

  public update(
    patientRelative: PatientRelative
  ): Promise<UpdateResult> | undefined {
    return getRepository(PatientRelative).createQueryBuilder().update(patientRelative).execute();
  }

  public delete(id: string): Promise<DeleteResult> | undefined {
    return getRepository(PatientRelative).delete({ id });
  }
}
