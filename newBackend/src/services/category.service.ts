import {Category, PrismaClient} from '@prisma/client';
import {CategoryDto} from '@dtos/category.dto';
import {HttpException} from '@exceptions/HttpException';
import {isEmpty} from '@utils/util';

// Создать models и работу с бд вынести в отдельные классы
class categoryService {
  public category = new PrismaClient().category;

  public async getCategories(take: number, skip: number): Promise<Category[]> {
    return await this.category.findMany({
      take: take,
      skip: skip,
    });
  }

  public async createCategory(categoryData: CategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, "сategoryData is empty");

    const findUser: Category = await this.category.findUnique({ where: { title: categoryData.title } });
    if (findUser) throw new HttpException(409, `This title ${categoryData.title} already exists`);

    return await this.category.create({data: categoryData});
  }

  public async updateCategory(categoryId: number, categoryData: CategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, "userData is empty");

    const findCategory: Category = await this.category.findUnique({ where: { id: categoryId } });
    if (!findCategory) throw new HttpException(409, "Category doesn't exist");

    return await this.category.update({where: {id: categoryId}, data: categoryData});
  }

}

export default categoryService;
