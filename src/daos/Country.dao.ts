import { Country } from "src/entity/Country.entity";
import { getRepository } from "typeorm";

export interface ICountryDao {
  getAll: () => Promise<Country[]>;
}

export class CountryDao implements ICountryDao {
  getAll(): Promise<Country[]> {
    return getRepository(Country).find();
  }
}
