import {NextFunction, Request, Response} from "express";
import {HttpException} from "@exceptions/HttpException";

const catchAsync = (fn) => (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next)

export default catchAsync
