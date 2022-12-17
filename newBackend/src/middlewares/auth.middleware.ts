import { NextFunction, RequestHandler } from "express";
import { HttpException } from '@exceptions/HttpException';
import catchAsync from "@utils/catchAsync";
import { DecodedToken } from "@interfaces/tokens.interface";
import JwtService from "@services/jwt.service";

const authMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const jwtService = new JwtService();

  const isProvided: string | null = req.headers.authorization && req.headers.authorization.startsWith("Bearer");
  if (!isProvided) throw new HttpException(401, "Token not provided");
  const providedToken: string = req.headers.authorization.split(' ')[1];
  const {userId, login}: DecodedToken = await jwtService.decodedAccessToken(providedToken);

  // запрос в бд на получение юзера
  next()
})



export default authMiddleware;
