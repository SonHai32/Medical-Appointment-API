import { DeleteResult, getRepository } from "typeorm";
import { UpdateResult } from "typeorm";
import { Doctor } from "./../entity/Doctor.entity";
export interface IDoctorDao {
  add: (doctor: Doctor) => Promise<Doctor> | undefined;
  update: (doctor: Doctor) => Promise<UpdateResult> | undefined;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  getOne: (id: string) => Promise<Doctor | undefined>;
  getAll: () => Promise<Doctor[]> | undefined;
}

export class DoctorDao implements IDoctorDao {
  add(doctor: Doctor): Promise<Doctor> | undefined {
    return getRepository(Doctor).save(doctor);
  }

  update(doctor: Doctor): Promise<UpdateResult> | undefined {
    return getRepository(Doctor).update(doctor.id, doctor);
  }

  delete(listID: string[]): Promise<DeleteResult> | undefined {
    return getRepository(Doctor).delete(listID);
  }

  getOne(id: string): Promise<Doctor | undefined> {
    return getRepository(Doctor).findOne({ id });
  }

  getAll(): Promise<Doctor[]> | undefined {
    return getRepository(Doctor).find();
  }
}
