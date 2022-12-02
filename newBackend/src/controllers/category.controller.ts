import { NextFunction, Request, Response } from 'express';
import { CategoryDto } from '@dtos/category.dto';
import { Category } from '@prisma/client';
import CategoryService from '@services/category.service';
import catchAsync from "@utils/catchAsync";
import {pagination} from "@utils/pagination";
import {resSend} from "@utils/resSend";

class CategoryController {
  public categoryService = new CategoryService();

  public getCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {take, skip} = pagination(Number(req.query.limit), Number(req.query.page));
    const items: Category[] = await this.categoryService.getCategories(take, skip);
    return resSend(res, {data: {items: items}});
  })

  public createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const item: Category = await this.categoryService.createCategory(req.body);
    return resSend(res, {data: {item: item}});
  })

  public updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const item: Category = await this.categoryService.updateCategory(Number(req.params.id), req.body);
    return resSend(res, {data: {item: item}});
  })


}

export default CategoryController;
