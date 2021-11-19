import { getRepository } from "typeorm";
import { District } from "src/entity/District.entity";

export interface IDistrictDao {
  getAll: () => Promise<District[]> | undefined;
}

export class DistrictDao implements IDistrictDao {
  getAll(): Promise<District[]> | undefined {
    return getRepository(District).find();
  }
}
