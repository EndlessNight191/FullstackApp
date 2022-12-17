import { HttpException } from "@exceptions/HttpException";
import RedisService from "@services/redis.service";
import JwtService from "@services/jwt.service";
import { DecodedToken, Tokens } from "@interfaces/tokens.interface";
import tokensConfig from "@/config/tokens.config";

class AuthorizationService {
  tokenConfig = tokensConfig;
  jwtService = new JwtService()

  public registration(login: string, password: string){

  }

  public async auth(login: string, password: string): Promise<object> {

    return {}
  }

  public async refreshToken(refreshToken: string | null): Promise<Tokens> {
    if (!refreshToken) throw new HttpException(400, `refresh is null`);
    const { userId, login, role }: DecodedToken = await this.jwtService.decodedAccessToken(refreshToken);
    const token = await RedisService.get(`refreshToken${userId}`);
    if (!token) throw new HttpException(400, `refresh is not find`);
    const {accessToken, refreshToken: refreshTokenUpdate}: Tokens = await this.jwtService.generate(userId, login, role);

    await RedisService.set({key: refreshTokenUpdate, value: `${userId}`, timeType: "EX", time: this.tokenConfig.refresh.expiration});
    //добавить. Записываем в бд новый access
    return { accessToken, refreshToken: refreshTokenUpdate }
  }

}

export default AuthorizationService;
