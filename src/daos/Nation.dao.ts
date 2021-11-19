import { getRepository } from "typeorm";
import { Nation } from "./../entity/Nation.entity";

export interface INationDao {
  getAll: () => Promise<Nation[]> | undefined;
}

export class NationDao implements INationDao {
  getAll(): Promise<Nation[]> | undefined {
    return getRepository(Nation).find();
  }
}
