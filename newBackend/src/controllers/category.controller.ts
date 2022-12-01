import { NextFunction, Request, Response } from 'express';
import { categoryDto } from '@dtos/category.dto';
import { Category } from '@prisma/client';
import categoryService from '@services/category.service';
import catchAsync from "@utils/catchAsync";
import {pagination} from "@utils/pagination";
import {resSend} from "@utils/resSend";

class CategoryController {
  public categoryService = new categoryService();

  public getCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {take, skip} = pagination(req.query.limit, req.query.page);
    const items: Category[] = await this.categoryService.getCategories(take, skip);
    return resSend(res, {data: {items: items}});
  })

  public createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const item: Category = await this.categoryService.createCategory(req.body);
    return resSend(res, {data: {item: item}});
  })

  public updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const item: Category = await this.categoryService.updateCategory(req.params.id, req.body);
    return resSend(res, {data: {item: item}});
  })


}

export default CategoryController;
