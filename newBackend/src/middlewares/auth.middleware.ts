import { NextFunction, RequestHandler } from "express";
import { HttpException } from '@exceptions/HttpException';
import catchAsync from "@utils/catchAsync";

const authMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const isProvided = req.headers.authorization && req.headers.authorization.startsWith("Bearer");
  if (!isProvided) throw new HttpException(401, "Token not provided");
  const providedToken = req.headers.authorization.split(' ')[1];

  if(providedToken !== 'admin') throw new HttpException(401, "Token not accept"); // вынести в 'admin'
  next()
})



export default authMiddleware;
