import { NextFunction, Request, Response } from 'express';
import { CreatedItemDto } from '@dtos/createdItemDto';
import { Item } from '@prisma/client';
import itemService from '@services/items.service';
import catchAsync from "@utils/catchAsync";
import {pagination} from "@utils/pagination";
import {resSend} from "@utils/resSend";

class ItemsController {
  public itemService = new itemService();

  public getItems = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {take: number, skip: number} = pagination(req.query.limit, req.query.page);
    const items: Item[] = await this.itemService.getItems(take, skip);
    return resSend(res, {data: {items: items}});
  })

  public getItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const item: Item = await this.itemService.getItem(req.params.id);
    return resSend(res, {data: {item: item}});
  })

  public getItemsByCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {take: number, skip: number} = pagination(req.query.limit, req.query.page);
    const items: Item = await this.itemService.getItemsByCategory(req.body.categoriesId, take, skip);
    return resSend(res, {data: {items: items}});
  })

  public createItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const item: Item = await this.itemService.createItem(req.body);
    return resSend(res, {data: {item: item}});
  })

  public updateItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const item: Item = await this.itemService.updateItem(req.params.id, req.body);
    return resSend(res, {data: {item: item}});
  })

}

export default ItemsController;
