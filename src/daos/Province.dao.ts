import { Country } from "./../entity/Country.entity";
import { getRepository } from "typeorm";
import { Province } from "../entity/Province.entity";

export interface IProvinceDao {
  getAll: (countryId?: string) => Promise<Province[]> | undefined;
}

export class ProvinceDao implements IProvinceDao {
  getAll(countryId?: string): Promise<Province[]> | undefined {
    if (!countryId) {
      return getRepository(Province).find({ relations: ["country"] });
    } else {
      return getRepository(Province).find({
        relations: ["country"],
        where: { country: { id: countryId } },
      });
    }
  }
}
