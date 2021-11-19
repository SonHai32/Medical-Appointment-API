import { getRepository } from "typeorm";
import { SpecialistPrice } from "./../entity/SpecialistPrice.entity";

export interface ISpecialistPriceDao {
  getAll: () => Promise<SpecialistPrice[]> | undefined;
}

export class SpecialistPriceDao implements ISpecialistPriceDao {
  getAll(): Promise<SpecialistPrice[]> | undefined {
    return getRepository(SpecialistPrice).find();
  }
}
