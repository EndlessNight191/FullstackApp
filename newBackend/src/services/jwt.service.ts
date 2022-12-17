import { DecodedToken, Tokens, TokensConfig } from "@interfaces/tokens.interface";
import tokenConfig from "@/config/tokens.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpException } from "@exceptions/HttpException";
import { RoleUser } from "@interfaces/users.intarface";

class JwtService {
  tokensConfig: TokensConfig = tokenConfig;

  async generate(userId: number, login: string, role: RoleUser): Promise<Tokens>{
    const accessToken: string = jwt.sign({
      userId: userId,
      login: login,
      role: role
    }, this.tokensConfig.access.secret, {expiresIn: this.tokensConfig.access.expiration});
    const refreshToken: string = jwt.sign({
      userId: userId,
      login: login,
      role: role,
      itsRefresh: true,
    }, this.tokensConfig.refresh.secret, {expiresIn: this.tokensConfig.refresh.expiration});

    return {accessToken, refreshToken}
  }

  async decodedAccessToken(accessToken: string): Promise<JwtPayload | string>{
    const decoded: DecodedToken | null = await jwt.verify(accessToken, this.tokensConfig.access.secret);
    if(!decoded) new HttpException(400, "token is not valid");
    return decoded
  }

  async decodedRefreshToken(refreshToken: string): Promise<JwtPayload | string>{
    const decoded: DecodedToken | null = await jwt.verify(refreshToken, this.tokensConfig.refresh.secret);
    if(!decoded) new HttpException(400, "token is not valid");
    return decoded
  }

}

export default JwtService
