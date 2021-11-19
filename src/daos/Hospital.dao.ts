import { DeleteResult, getRepository } from "typeorm";
import { Hospital } from "./../entity/Hospital.entity";
export interface IHospitalDao {
  add: (hospital: Hospital) => Promise<Hospital> | undefined;
  update: (hospital: Hospital) => Promise<Hospital> | undefined;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  getOne: (id: string) => Promise<Hospital | undefined>;
  getAll: () => Promise<Hospital[]> | undefined;
}

export class HospitalDao implements IHospitalDao {
  add(hospital: Hospital): Promise<Hospital> | undefined {
    return getRepository(Hospital).save(hospital);
  }

  update(hospital: Hospital): Promise<Hospital> | undefined {
    return getRepository(Hospital).save(hospital);
  }

  delete(listID: string[]): Promise<DeleteResult> | undefined {
    return getRepository(Hospital).delete(listID);
  }

  getOne(id: string): Promise<Hospital | undefined> {
    return getRepository(Hospital).findOne({ id });
  }

  getAll(): Promise<Hospital[]> | undefined {
    return getRepository(Hospital).find();
  }
}
