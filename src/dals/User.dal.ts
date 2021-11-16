import bcript from "bcrypt";
import { User } from "./../entity/User.entity";
import {
  DeleteResult,
  getConnection,
  getRepository,
  InsertResult,
  UpdateResult,
} from "typeorm";

const userRespository = () => {
  return getRepository(User);
};

export const insertUser = (user: User): Promise<InsertResult> | undefined => {
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
};

export const updateUserDetail = (
  fullname: string,
  emailAddress: string,
  phoneNumber: string,
  userID: string
): Promise<UpdateResult> => {
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

export const updateUserPassword = (
  id: string,
  newPassword: string
): Promise<UpdateResult> | undefined => {
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
};

export const getAllUser = (): Promise<User[]> | undefined => {
  try {
    return userRespository().find();
  } catch (error) {}
};

/**
 * @id
 * The id of user for get data
 */
export const getUserDetail = (id: string): Promise<User | undefined> => {
  try {
    return userRespository().findOne(
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
};
/**
 *
 * @param listID List of user id
 * @returns Promise type of DeleteResult
 */
export const deleteUsers = (listID: string[]): Promise<DeleteResult> => {
  try {
    return userRespository().delete(listID);
  } catch (error) {
    throw error;
  }
};

export const userLogin = (
  username: string,
  password: string
): Promise<User> => {
  return new Promise(async (reslove, reject) => {
    try {
      const user: User | undefined = await userRespository().findOne(
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
        bcript.compare(password, user.password, (err, result) => {
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
};


