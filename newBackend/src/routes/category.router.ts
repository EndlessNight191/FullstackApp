import { Router } from 'express';
import СategoryController from '@controllers/category.controller';
import { CategoryDto } from '@dtos/category.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from "@middlewares/auth.middleware";

class ItemsRoute implements Routes {
  public path = '/category';
  public router = Router();
  public categoryController = new СategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoryController.getCategories);

    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CategoryDto, 'body'), this.categoryController.createCategory);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(CategoryDto, 'body', true), this.categoryController.updateCategory);
  }
}

export default ItemsRoute;
