import { getRepository } from "typeorm";
import { Province } from "../entity/Province.entity";

export interface IProvinceDao {
  getAll: () => Promise<Province[]> | undefined;
}

export class ProvinceDao implements IProvinceDao {
  getAll(): Promise<Province[]> | undefined {
    return getRepository(Province).find();
  }
}
