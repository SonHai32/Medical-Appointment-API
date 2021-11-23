import { getRepository } from "typeorm";
import { Ward } from "./../entity/Ward.entity";

export interface IWardDao {
  getAll(): Promise<Ward[]> | undefined;
}

export class WardDao implements IWardDao {
  getAll(): Promise<Ward[]> | undefined {
    return getRepository(Ward).find({relations: ['district']});
  }
}
