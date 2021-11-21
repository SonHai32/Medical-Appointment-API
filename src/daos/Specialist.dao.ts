import { getRepository, UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm";
import { Specialist } from "./../entity/Specialist.entity";
export interface ISpecialistDao {
  add: (specialist: Specialist) => Promise<Specialist> | undefined;
  update: (specialist: Specialist) => Promise<UpdateResult> | undefined;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  updatePrice: (id: string, price: number) => Promise<UpdateResult> | undefined;
  getOne: (id: string) => Promise<Specialist | undefined>;
  getAll: () => Promise<Specialist[]> | undefined;
}

export class SpecialistDao implements ISpecialistDao {
  add(specialist: Specialist): Promise<Specialist> | undefined {
    return getRepository(Specialist).save(specialist);
  }

  update(specialist: Specialist): Promise<UpdateResult> | undefined {
    return getRepository(Specialist).update(specialist.id, specialist);
  }

  delete(listID: string[]): Promise<DeleteResult> | undefined {
    return getRepository(Specialist).delete(listID);
  }

  updatePrice(id: string, price: number): Promise<UpdateResult> | undefined {
    return getRepository(Specialist).update({ id }, { price });
  }

  getAll(): Promise<Specialist[]> | undefined {
    return getRepository(Specialist).find();
  }

  getOne(id: string): Promise<Specialist | undefined> {
    return getRepository(Specialist).findOne({ id });
  }
}
