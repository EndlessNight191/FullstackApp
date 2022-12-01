import { Router } from 'express';
import ItemsController from '@controllers/items.controller';
import { CreatedItemDto } from '@dtos/createdItemDto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ItemsRoute implements Routes {
  public path = '/items';
  public router = Router();
  public itemsController = new ItemsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.itemsController.getItems);
    this.router.get(`${this.path}/:id(\\d+)`, this.itemsController.getItem);
    this.router.patch(`${this.path}/category`, this.itemsController.getItemsByCategories);

    this.router.post(`${this.path}`, validationMiddleware(CreatedItemDto, 'body'), this.itemsController.createItem);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreatedItemDto, 'body', true), this.itemsController.updateItem);
  }
}

export default ItemsRoute;
