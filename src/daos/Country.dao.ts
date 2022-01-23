import { Country } from "../entity/Country.entity";
import { getRepository } from "typeorm";

export interface ICountryDao {
  getAll: () => Promise<Country[]>;
  getAllByCountry: (countryId: string) => Promise<Country[]>;
}

export class CountryDao implements ICountryDao {
  getAll(): Promise<Country[]> {
    return getRepository(Country).find();
  }

  getAllByCountry(countryId: string) {
    return getRepository(Country).find({
      relations: ["country"],
      where: `countryId = '${countryId}'`,
    });
  }
}
