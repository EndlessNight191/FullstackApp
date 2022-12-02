import {Item, PrismaClient} from '@prisma/client';
import {CreateItemDto} from '@dtos/createdItem.dto';
import {HttpException} from '@exceptions/HttpException';
import {isEmpty} from '@utils/util';

interface categoryId {
  id: number
}

// Создать models и работу с бд вынести в отдельные классы
class itemService {
  public items = new PrismaClient().item;

  public async getItems(take: number, skip: number): Promise<Item[]> {
    return this.items.findMany({
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
    return this.items.findMany({
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
    console.log(itemId)
    if (isEmpty(itemId)) throw new HttpException(400, "itemId is empty");
    console.log(itemId)
    const item: Item = await this.items.findUnique({
      where: { id: itemId },
      include: {
        CategoriesOnItems: {
          include: {category: true}
        }
      },
    });
    if (!item) throw new HttpException(409, "Item doesn't exist");
    return item;
  }

  public async createItem(itemData: CreateItemDto): Promise<Item> {
    if (isEmpty(itemData)) throw new HttpException(400, "itemData is empty");
    const findItem: Item = await this.items.findUnique({ where: { title: itemData.title } });
    if (findItem) throw new HttpException(409, `This title ${itemData.title} already exists`);

    if(itemData.categoriesId){
      const categories: categoryId[] = itemData.categoriesId.map(item => {return {id: item}});
      delete itemData.categoriesId;
      categories.length > 0 ? itemData.CategoriesOnItems = {connect: categories} : false // вынести в utils?
    }
    return this.items.create({data: itemData});
  }

  public async updateItem(itemId: number, itemData: CreateItemDto): Promise<Item> {
    if (isEmpty(itemData)) throw new HttpException(400, "userData is empty");

    const findItem: Item = await this.items.findUnique({ where: { id: itemId } });
    if (!findItem) throw new HttpException(409, "User doesn't exist");
    console.log(itemData)
    if(itemData.categoriesId){
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
    }

    return this.items.update({where: {id: itemId}, data: {itemData}});
  }

  public async updateItemImage(itemId: number, imageName: string){
    const findItem: Item = await this.items.findUnique({ where: { id: itemId } });
    if (!findItem) throw new HttpException(409, "User doesn't exist");

    return this.items.update({where: {id: itemId}, data: {image: imageName}});
  }

}

export default itemService;
