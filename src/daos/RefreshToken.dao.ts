import { RefreshToken } from "../entity/RefreshToken.entity";
import { getRepository } from "typeorm";
export class RefreshTokenDao {
  save(token: string): Promise<RefreshToken | undefined> {
    const refreshToken = new RefreshToken();
    refreshToken.token = token;
    return getRepository(RefreshToken).save(refreshToken);
  }
  get(token: string): Promise<RefreshToken | undefined> {
    return getRepository(RefreshToken).findOne({ where: { token } });
  }
}
