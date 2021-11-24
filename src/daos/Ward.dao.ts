import { getRepository } from "typeorm";
import { Ward } from "./../entity/Ward.entity";

export interface IWardDao {
  getAll(districtId?: string): Promise<Ward[]> | undefined;
}

export class WardDao implements IWardDao {
  getAll(districtId?: string): Promise<Ward[]> | undefined {
    if (districtId) {
      return getRepository(Ward).find({
        relations: ["district"],
        where: [{ district: { id: districtId } }],
      });
    }
    return getRepository(Ward).find({ relations: ["district"] });
  }
}
