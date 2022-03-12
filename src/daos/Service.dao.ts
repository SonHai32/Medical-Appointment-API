import { getRepository } from "typeorm";
import { Service } from "./../entity/Service.entity";
export interface IServiceDao {
  add: (services: Service[]) => Promise<Service[]> | undefined;
  getAllByHospitalId: (hospitalId: string) => Promise<Service[] | undefined>;
  getAll: () => Promise<Service[]> | undefined;
}

export class ServiceDao implements IServiceDao {
  getAll() {
    return getRepository(Service).find({relations: ['specialist', 'hospital']});
  }

  add(services: Service[]): Promise<Service[]> | undefined {
    return getRepository(Service).save(services);
  }

  getAllByHospitalId(hospitalId: string) {
    return getRepository(Service).find({
      relations: ["hospital", "specialist"],
      where: `hospitalId = '${hospitalId}'`,
    });
  }
}
