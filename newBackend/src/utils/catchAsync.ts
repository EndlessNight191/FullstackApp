import {NextFunction, Request, Response} from "express";
import {HttpException} from "@exceptions/HttpException";

const catchAsync = (fn) => (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(e => new HttpException(500, e))

export default catchAsync
