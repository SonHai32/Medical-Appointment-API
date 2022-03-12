import { PatientRecord } from "./../entity/PatientRecord.entity";
import bcrypt from "bcrypt";
import { DeleteResult, UpdateResult, getRepository } from "typeorm";
import { User } from "./../entity/User.entity";
export interface IUserDao {
  register: (user: User) => Promise<User | undefined>;
  getAll: () => Promise<User[]> | undefined;
  getOne: (userID: string) => Promise<User | undefined>;
  getBy: (param: {}) => Promise<User | undefined>;
  delete: (listID: string[]) => Promise<DeleteResult> | undefined;
  login: (username: string, password: string) => Promise<User | undefined>;
  update: (user: User) => Promise<User | undefined>;
  changePassword: (
    username: string,
    oldPassword: string,
    newPassword: string
  ) => Promise<UpdateResult | undefined>;
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

  async register(user: User): Promise<User | undefined> {
    try {
      const usernameExisted = await getRepository(User).findOne({
        where: { username: user.username },
      });
      if (!usernameExisted) {
        const hashPassword = await bcrypt.hash(user.password, 10);
        if (hashPassword) {
          user.password = hashPassword;
          return getRepository(User).save(user);
        } else {
          throw new Error("Có lỗi xảy ra trong quá trình khởi tạo mật khẩu");
        }
      } else throw new Error("Tên tài khoản đã tồn tại");
    } catch (error) {
      throw error;
    }
  }

  public getAll(): Promise<User[]> | undefined {
    try {
      return getRepository(User).find({
        select: [
          "fullname",
          "createdAt",
          "emailAddress",
          "active",
          "phoneNumber",
          "username",
          "id",
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  public getBy(param: {}): Promise<User | undefined> {
    try {
      return getRepository(User).findOne({ ...param });
    } catch (error) {
      throw error;
    }
  }

  public getOne(id: string): Promise<User | undefined> {
    try {
      return getRepository(User).findOne(
        { id },
        {
          select: [
            "fullname",
            "createdAt",
            "emailAddress",
            "active",
            "phoneNumber",
            "username",
            "id",
            "patientRecord",
          ],
          relations: [
            "patientRecord",
            "patientRecord.patientSchedule",
            "patientRecord.patientSchedule.patientRecord",
            "patientRecord.patientSchedule.service",
            "patientRecord.patientSchedule.service.hospital",
            "patientRecord.patientSchedule.service.specialist",
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

  public async login(
    username: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const user: User | undefined = await getRepository(User).findOne(
        {
          username,
        },
        {
          select: ["fullname", "emailAddress", "active", "username", "id"],
        }
      );
      if (user) {
        if (user.active) {
          const isPasswordValid = await this.passwordChecking(
            username,
            password
          );
          if (isPasswordValid) {
            return user;
          } else {
            throw new Error("Đăng nhập thất bại, mật khẩu sai");
          }
        } else {
          throw new Error("Tài khoản không còn khả dụng");
        }
      } else {
        throw new Error("Tài khoản không tồn tại vui lòng kiểm tra");
      }
    } catch (error) {
      throw error;
    }
  }

  public update = async (user: User): Promise<User | undefined> => {
    return getRepository(User).save(user);
  };

  public async changePassword(
    username: string,
    oldPassword: string,
    newPassword: string
  ): Promise<UpdateResult | undefined> {
    try {
      const isPasswordValid: boolean = await this.passwordChecking(
        username,
        oldPassword
      );
      if (isPasswordValid) {
        const newHashPassword = await bcrypt.hash(
          newPassword,
          process.env.SALT_ROUNDS || 10
        );
        if (newHashPassword) {
          return getRepository(User)
            .createQueryBuilder()
            .update({ username })
            .set({ password: newHashPassword })
            .execute();
        } else {
          throw new Error("Error while encrypting password");
        }
      } else {
        throw new Error("Error while checking your password");
      }
    } catch (error) {
      throw error;
    }
  }

  private async passwordChecking(
    username: string,
    password: string
  ): Promise<boolean> {
    try {
      const user: User | undefined = await getRepository(User).findOne({
        where: { username },
      });
      if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        return isValid;
      } else {
        throw new Error("username does not exist");
      }
    } catch (error) {
      throw error;
    }
  }
}
