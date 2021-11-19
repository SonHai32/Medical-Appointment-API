import { PatientRecord } from "./../entity/PatientRecord.entity";
import bcript from "bcrypt";
import {
  DeleteResult,
  getConnection,
  InsertResult,
  UpdateResult,
  getRepository,
} from "typeorm";
import { User } from "./../entity/User.entity";
export interface IUserDao {
  //   getRepository: () => Repository<User>;
  add: (user: User) => Promise<InsertResult> | undefined;
  getAll: () => Promise<User[]> | undefined;
  getOne: (userID: string) => Promise<User | undefined>;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  login: (username: string, password: string) => Promise<User>;
  updateDetail: (
    fullname: string,
    emailAddress: string,
    phoneNumber: string,
    userID: string
  ) => Promise<UpdateResult> | undefined;
  changePassword: (
    newPassword: string,
    userID: string
  ) => Promise<UpdateResult> | undefined;
  addPatientRecord: (
    user: string,
    patientRecord: PatientRecord
  ) => Promise<User>;
}

export class UserDao implements IUserDao {
  async addPatientRecord(
    userID: string,
    patientRecord: PatientRecord
  ): Promise<User> {
    try {
      const userRespository = getRepository(User);
      const user = await userRespository.findOne(
        { id: userID },
        { relations: ["patient_record"] }
      );
      if (user) {
        user.patientRecord.push(patientRecord);
        return userRespository.save(user);
      } else {
        throw new Error("User does not exist");
      }
    } catch (error) {
      throw error;
    }
  }
  
  public add(user: User): Promise<InsertResult> | undefined {
    try {
      return getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([user])
        .execute();
    } catch (error) {
      throw error;
    }
  }

  public getAll(): Promise<User[]> | undefined {
    try {
      return getRepository(User).find();
    } catch (error) {}
  }

  public getOne(id: string): Promise<User | undefined> {
    try {
      return getRepository(User).findOne(
        { id },
        {
          select: [
            "fullname",
            "createdAt",
            "role",
            "emailAddress",
            "active",
            "phoneNumber",
            "username",
            "id",
          ],
        }
      );
    } catch (error) {
      throw error;
    }
  }

  public delete(listID: string[]): Promise<DeleteResult> | undefined {
    try {
      return getRepository(User).delete(listID);
    } catch (error) {
      throw error;
    }
  }

  public login(username: string, password: string): Promise<User> {
    return new Promise(async (reslove, reject) => {
      try {
        const user: User | undefined = await getRepository(User).findOne(
          {
            username,
          },
          {
            select: [
              "fullname",
              "role",
              "emailAddress",
              "active",
              "username",
              "id",
            ],
          }
        );
        if (user && user.password) {
          bcript.compare(password, user.password, (err: any, result: any) => {
            if (err) {
              reject(err);
            }
            if (result) {
              if (!user.active) {
                reject(new Error("User has been disabled"));
              } else {
                reslove(user);
              }
              reslove(user);
            } else {
              reject(new Error("Wrong password"));
            }
          });
        } else {
          reject(new Error("Username doesn't exist "));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  public updateDetail = (
    fullname: string,
    emailAddress: string,
    phoneNumber: string,
    userID: string
  ) => {
    try {
      return getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ fullname, emailAddress, phoneNumber })
        .where("id = :id", { id: userID })
        .execute();
    } catch (error) {
      throw error;
    }
  };

  public changePassword(
    newPassword: string,
    id: string
  ): Promise<UpdateResult> | undefined {
    try {
      return getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ password: newPassword })
        .where("id = :id", { id })
        .execute();
    } catch (error) {
      throw error;
    }
  }
}
