import { getRepository } from "typeorm";
import { Role } from "./../entity/Role.entity";

export interface IRoleDao {
  getAll: () => Promise<Role[]> | undefined;
}

export class RoleDao implements IRoleDao {
  getAll(): Promise<Role[]> | undefined {
    return getRepository(Role).find();
  }
}
