import {Item, PrismaClient} from '@prisma/client';
import {CreatedItemDto} from '@dtos/createdItem.dto';
import {UpdateItemDto} from '@dtos/updateItem.dto';
import {HttpException} from '@exceptions/HttpException';
import {isEmpty} from '@utils/util';
import CategoryService from '@services/category.service'

interface categoryId {
  categoryId: number
}

// Создать models и работу с бд вынести в отдельные классы
class itemService {
  public items = new PrismaClient().item;
  public categoriesService = new CategoryService()

  public async getItems(take: number, skip: number): Promise<Item[]> {
    return this.items.findMany({
      take: take,
      skip: skip,
      include: {
        categories: {
          include: {category: true}
        }
      },
    });
  }

  public async getItemsByCategory(categoriesId: number[], take: number, skip: number): Promise<Item[]> {
    return this.items.findMany({
      take: take,
      skip: skip,
      where: {
        categories: {
          some: {
            categoryId: {in: categoriesId}
          }
        }
      },
      include: {
        categories: {
          include: {category: true}
        }
      },
    })
  }

  public async findItemById(itemId: number): Promise<Item> {
    if (isEmpty(itemId)) throw new HttpException(400, "itemId is empty");
    const item: Item = await this.items.findUnique({
      where: { id: itemId },
      include: {
        categories: {
          include: {category: true}
        }
      },
    });
    if (!item) throw new HttpException(409, "Item doesn't exist");
    return item;
  }

  public async createItem(itemData: CreatedItemDto): Promise<Item> {
    if (isEmpty(itemData)) throw new HttpException(400, "itemData is empty");
    const findItem: Item = await this.items.findUnique({ where: { title: itemData.title } });
    if (findItem) throw new HttpException(409, `This title ${itemData.title} already exists`);

    if(itemData.categoriesId){ // вынести в utils?
      await this.categoriesService.checkCategories(itemData.categoriesId);
      const categoriesMany: categoryId[] = itemData.categoriesId.map(item => {return {categoryId: item}});
      var categories = {createMany: {data: JSON.parse(JSON.stringify(categoriesMany))}};
      delete itemData.categoriesId;
    }
    return this.items.create({data: {...itemData, categories}});
  }

  public async updateItem(itemId: number, itemData: UpdateItemDto): Promise<Item> {
    if (isEmpty(itemData)) throw new HttpException(400, "userData is empty");

    const findItem: Item = await this.items.findUnique({ where: { id: itemId } });
    if (!findItem) throw new HttpException(409, "User doesn't exist");
    if(itemData.categoriesId){ // вынести в utils?
      await this.categoriesService.checkCategories(itemData.categoriesId)
      const categoriesMany: categoryId[] = itemData.categoriesId.map(item => {return {categoryId: item}});
      var categories = {createMany: {data: JSON.parse(JSON.stringify(categoriesMany))}};
      delete itemData.categoriesId;
      // удалить связанные записи перед этим
      await this.items.update({
        where: {id: itemId},
        data: { categories: {deleteMany: {}}}
      })
    }

    return this.items.update({where: {id: itemId}, data: {...itemData, categories}});
  }

  public async updateItemImage(itemId: number, imageName: string){
    const findItem: Item = await this.items.findUnique({ where: { id: itemId } });
    if (!findItem) throw new HttpException(409, "User doesn't exist");

    return this.items.update({where: {id: itemId}, data: {image: imageName}});
  }

}

export default itemService;
