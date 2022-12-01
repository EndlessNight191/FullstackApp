import { Router } from 'express';
import СategoryController from '@controllers/category.controller';
import { categoryDto } from '@dtos/category.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ItemsRoute implements Routes {
  public path = '/category';
  public router = Router();
  public categoryController = new СategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoryController.getCategories);

    this.router.post(`${this.path}`, validationMiddleware(categoryDto, 'body'), this.categoryController.createCategory);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(categoryDto, 'body', true), this.categoryController.updateCategory);
  }
}

export default ItemsRoute;
