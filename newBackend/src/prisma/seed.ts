import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main(){
  const categories = await prisma.category.createMany({
    data: [
      {
        title: 'Очень вкусно',
      },
      {
        title: 'Итальянская кухня',
      },
    ]
  });

  const items = await prisma.item.createMany({
    data: [
      {
        title: 'Eat',
        description: 'Вкуснейший сочный',
        price: 600,
      },
      {
        title: 'Пицца 4 сыра',
        description: 'Тонкая пицца',
        price: 400,
      }
    ]
  });

  console.log({ items, categories })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
