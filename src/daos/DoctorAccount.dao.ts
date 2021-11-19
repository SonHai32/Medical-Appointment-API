import { getRepository, UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm";
import { DoctorAccount } from "../entity/DoctorAccount.entity";
import bcrypt from "bcrypt";
export interface IDoctorAccountDao {
  register: (
    doctorAccount: DoctorAccount
  ) => Promise<DoctorAccount> | undefined;
  login: (
    username: string,
    password: string
  ) => Promise<DoctorAccount> | undefined;
  getAll: () => Promise<DoctorAccount[]> | undefined;
  getOne: (id: string) => Promise<DoctorAccount | undefined>;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  update: (doctorAccount: DoctorAccount) => Promise<DoctorAccount> | undefined;
  disable: (listID: string[]) => Promise<UpdateResult> | undefined;
}

export class DoctorAccountDao implements IDoctorAccountDao {
  register(doctorAccount: DoctorAccount): Promise<DoctorAccount> | undefined {
    return new Promise(async (reslove, reject) => {
      try {
        bcrypt.hash(
          doctorAccount.password,
          Number(process.env.SALT_ROUNDS) | 10,
          (err: any, ecrypted: string) => {
            if (err) {
              throw err;
            } else {
              doctorAccount.password = ecrypted;
              const account = getRepository(DoctorAccount).save(doctorAccount);
              reslove(account);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  login(username: string, password: string): Promise<DoctorAccount> {
    return new Promise(async (reslove, reject) => {
      try {
        const accoutExisted: DoctorAccount | undefined = await getRepository(
          DoctorAccount
        ).findOne({ username });
        if (accoutExisted) {
          const rightPassword: boolean = await bcrypt.compare(
            password,
            accoutExisted.password
          );
          if (rightPassword) {
            reslove(accoutExisted); /// add jwt later
          } else {
            throw new Error("Wrong password");
          }
        } else {
          throw new Error("User does not exist");
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  getAll(): Promise<DoctorAccount[]> | undefined {
    return getRepository(DoctorAccount).find({
      select: ["createdAt", "doctor", "id", "username"],
    });
  }

  getOne(id: string): Promise<DoctorAccount | undefined> {
    return getRepository(DoctorAccount).findOne(id);
  }

  delete(listID: string[]): Promise<DeleteResult> | undefined {
    return getRepository(DoctorAccount).delete(listID);
  }

  disable(listID: string[]): Promise<UpdateResult> {
    return getRepository(DoctorAccount).update(listID, { active: false });
  }

  update(doctorAccount: DoctorAccount): Promise<DoctorAccount> | undefined {
    return getRepository(DoctorAccount).save(doctorAccount);
  }
}
