import { UserInsert } from "../controllers/User.controller";
import { getRepository, InsertResult } from "typeorm";
import { User } from "./../entity/User.entity";
import { Request, Response } from "express";
import { Role } from "../entity/Role.entity";

export const _Insert = async (req: Request, res: Response) => {
  try {
    const { fullname, phoneNumber, emailAddress, username, password } =
      req.body;
    const role = await getRepository(Role)
      .createQueryBuilder("role")
      .where("role.id =:id", { id: 1 })
      .getOne();
    if (role) {
      const user = new User(
        fullname,
        phoneNumber,
        emailAddress,
        username,
        password,
        role
      );
      const result: InsertResult | undefined = await UserInsert(user);
      if (result) {
        res.status(200).json({ result: result.raw });
      }
    } else throw new Error("role not found in database");
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
