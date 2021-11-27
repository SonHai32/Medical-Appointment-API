import { DeleteResult, getRepository } from "typeorm";
import { UpdateResult } from "typeorm";
import { AcademicRank } from "../entity/AcademicRank.entity";

export interface IAcademicRankDao {
  add: (academicRank: AcademicRank) => Promise<AcademicRank> | undefined;
  update: (academicRank: AcademicRank) => Promise<UpdateResult> | undefined;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  getOne: (id: string) => Promise<AcademicRank | undefined>;
  getAll: () => Promise<AcademicRank[]> | undefined;
}

export class AcademicRankDao implements IAcademicRankDao {
  add(academicRank: AcademicRank): Promise<AcademicRank> | undefined {
    return getRepository(AcademicRank).save(academicRank);
  }

  update(academicRank: AcademicRank): Promise<UpdateResult> | undefined {
    return getRepository(AcademicRank).createQueryBuilder().update(academicRank).execute()
  }

  delete(listID: string[]): Promise<DeleteResult> | undefined {
    return getRepository(AcademicRank).delete(listID);
  }

  getOne(id: string): Promise<AcademicRank | undefined> {
    return getRepository(AcademicRank).findOne({ id });
  }

  getAll(): Promise<AcademicRank[]> | undefined {
    return getRepository(AcademicRank).find();
  }
}
