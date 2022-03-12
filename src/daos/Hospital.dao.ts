import { DeleteResult, getRepository, UpdateResult } from "typeorm";
import { Hospital } from "./../entity/Hospital.entity";
export interface IHospitalDao {
  add: (hospital: Hospital) => Promise<Hospital | undefined>;
  update: (hospital: Hospital) => Promise<UpdateResult> | undefined;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  getOne: (id: string) => Promise<Hospital | undefined>;
  getAll: () => Promise<Hospital[]> | undefined;
}

export class HospitalDao implements IHospitalDao {
  async add(hospital: Hospital): Promise<Hospital | undefined> {
    const existedName = await getRepository(Hospital).findOne({
      where: { name: hospital.name },
    });
    if (existedName) {
      throw new Error("Tên bệnh viện đã trùng");
    }
    return getRepository(Hospital).save(hospital);
  }

  update(hospital: Hospital): Promise<UpdateResult> | undefined {
    return getRepository(Hospital)
      .createQueryBuilder()
      .where({ id: hospital.id })
      .update({
        name: hospital.name,
        ward: hospital.ward,
        address: hospital.address,
      })
      .execute();
  }

  delete(listID: string[]): Promise<DeleteResult> | undefined {
    return getRepository(Hospital).delete(listID);
  }

  /**
   *
   *
   * @param {string} id
   * @param {string[]} [relations] list relation you want to get with
   * @return {*}  {(Promise<Hospital | undefined>)}
   * @memberof HospitalDao
   */
  getOne(id: string, relations?: string[]): Promise<Hospital | undefined> {
    return getRepository(Hospital).findOne({ id }, { relations: relations });
  }

  getAll(): Promise<Hospital[]> | undefined {
    return getRepository(Hospital).find({
      relations: [
        "ward",
        "ward.district",
        "ward.district.province",
        "ward.district.province.country",
      ],
    });
  }
}
