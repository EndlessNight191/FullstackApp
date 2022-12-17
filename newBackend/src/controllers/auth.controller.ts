import { NextFunction, Request, Response } from 'express';
import catchAsync from "@utils/catchAsync";
import {resSend} from "@utils/resSend";
import { HttpException } from "@exceptions/HttpException";

class AuthController {

  public authCheck = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const isProvided = req.headers.authorization && req.headers.authorization.startsWith("Bearer");
    if (!isProvided) throw new HttpException(401, "Token not provided");
    const providedToken = req.headers.authorization.split(' ')[1];

    if(providedToken !== 'admin') new HttpException(401, "Token not accept"); // вынести в env password
    return resSend(res, {data: {auth: true}});
  })

  public refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    return resSend(res, {data: {authToken: 'asd', refreshToken: ''}});
  })

}

export default AuthController;
