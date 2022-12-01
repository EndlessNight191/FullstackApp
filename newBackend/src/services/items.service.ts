import {hash} from 'bcrypt';
import {Item, PrismaClient} from '@prisma/client';
import {CreateItemDto} from '@dtos/createdItemDto';
import {HttpException} from '@exceptions/HttpException';
import {isEmpty} from '@utils/util';

interface categoryId {
  id: number
}

// Создать models и работу с бд вынести в отдельные классы
class itemService {
  public items = new PrismaClient().item;

  public async getItems(take: number, skip: number): Promise<Item[]> {
    return await this.items.findMany({
      take: take,
      skip: skip,
      include: {
        CategoriesOnItems: {
          include: {Category: true}
        }
      },
    });
  }

  public async getItemsByCategory(categoriesId: number[], take: number, skip: number): Promise<Item[]> {
    return await this.items.findMany({
      take: take,
      skip: skip,
      where: {
        CategoriesOnItems: {
          Category: {id: {in: categoriesId}}
        }
      },
      include: {
        CategoriesOnItems: {
          include: {Category: true}
        }
      },
    })
  }

  public async findItemById(itemId: number): Promise<Item> {
    if (isEmpty(itemId)) throw new HttpException(400, "itemId is empty");

    const item: Item = await this.items.findUnique({
      where: { id: itemId },
      include: {
        CategoriesOnItems: {
          include: {Category: true}
        }
      },
    });
    if (!item) throw new HttpException(409, "Item doesn't exist");

    return item;
  }

  public async createItem(itemData: CreateItemDto): Promise<Item> {
    if (isEmpty(itemData)) throw new HttpException(400, "itemData is empty");

    const findUser: Item = await this.items.findUnique({ where: { email: itemData.title } });
    if (findUser) throw new HttpException(409, `This title ${itemData.title} already exists`);

    const categories: categoryId = itemData.categoriesId.map(item => {return {id: item}});
    delete itemData.categoriesId;
    itemData.CategoriesOnItems = {connect: categories}; // вынести в utils?
    const createdItemData: Item = await this.items.create({ data: {itemData} });
    return createdItemData;
  }

  public async updateItem(itemId: number, itemData: CreateItemDto): Promise<Item> {
    if (isEmpty(itemData)) throw new HttpException(400, "userData is empty");

    const findUser: Item = await this.items.findUnique({ where: { id: itemId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const categories: categoryId = itemData.categoriesId.map(item => {return {id: item}});
    delete itemData.categoriesId;
    itemData.CategoriesOnItems = {connect: categories}; // вынести в utils?
    // удалить связанные записи перед этим
    await this.items.update({
      where: {id: itemId},
      data: {
        CategoriesOnItems: {deleteMany: {}},
      }
    })

    const updateUserData = await this.items.update({ where: { id: itemId }, data: {itemData}});
    return updateUserData;
  }

}

export default itemService;
