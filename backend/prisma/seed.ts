import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.campaign.create({
    data: {
      name: 'Example Campaign',
      endsAt: '2025-03-14T15:00:00.000+01:00',
      allocatedBudget: 5000,
      currentExpense: 2000,
      channel: {
        create: {
          name: 'TV',
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
