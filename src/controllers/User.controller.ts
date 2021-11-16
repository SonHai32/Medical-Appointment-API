import { User } from "./../entity/User.entity";
import { getConnection, getRepository, InsertResult } from "typeorm";

export const UserInsert = async (user: User): Promise<InsertResult | undefined> => {
  try {
    return getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([user])
      .execute();
  } catch (error) {}
};
