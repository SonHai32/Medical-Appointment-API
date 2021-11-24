import { getRepository } from "typeorm";
import { District } from "../entity/District.entity";

export interface IDistrictDao {
  getAll: (provinceId?: string) => Promise<District[]> | undefined;
}

export class DistrictDao implements IDistrictDao {
  getAll(provinceId?: string): Promise<District[]> | undefined {
    if (provinceId) {
      return getRepository(District).find({
        relations: ["province"],
        where: [{ province: { id: provinceId } }],
      });
    }
    return getRepository(District).find({ relations: ["province"] });
  }
}
