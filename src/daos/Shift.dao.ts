import { getRepository } from "typeorm";
import { DeleteResult } from "typeorm";
import { UpdateResult } from "typeorm";
import { Shift } from "./../entity/Shift.entitty";
export interface IShiftDao {
  add: (shift: Shift) => Promise<Shift> | undefined;
  update: (shift: Shift) => Promise<UpdateResult> | undefined;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  getOne: (id: string) => Promise<Shift | undefined>;
  getAll: () => Promise<Shift[]> | undefined;
}

export class ShiftDao implements IShiftDao {
  add(shift: Shift): Promise<Shift> | undefined {
    return getRepository(Shift).save(shift);
  }

  update(shift: Shift): Promise<UpdateResult> | undefined {
    return getRepository(Shift).createQueryBuilder().update(shift).execute()
  }

  delete(listID: string[]): Promise<DeleteResult> | undefined {
    return getRepository(Shift).delete(listID);
  }

  getOne(id: string): Promise<Shift | undefined> {
    return getRepository(Shift).findOne({ id });
  }

  getAll(): Promise<Shift[]> | undefined {
    return getRepository(Shift).find();
  }
}
