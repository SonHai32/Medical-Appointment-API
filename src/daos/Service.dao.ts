import { getRepository } from "typeorm";
import { Service } from "./../entity/Service.entity";
export interface IServiceDao {
  add: (service: Service) => Promise<Service> | undefined;
  getAllByHospitalId: (hospitalId: string) => Promise<Service[] | undefined>;
}

export class ServiceDao implements IServiceDao {
  add(service: Service): Promise<Service> | undefined {
    return getRepository(Service).save(service);
  }

  getAllByHospitalId(hospitalId: string) {
    return getRepository(Service).find({
      relations: ["hospital", "specialist"],
      where: `hospitalId = '${hospitalId}'`,
    });
  }
}
