import { getRepository } from "typeorm";
import { Gender } from "src/entity/Gender.entity";

export interface IGenderDao {
  getAll: () => Promise<Gender[]> | undefined;
}

export class GenderDao implements IGenderDao {
  getAll(): Promise<Gender[]> | undefined {
    return getRepository(Gender).find();
  }
}
