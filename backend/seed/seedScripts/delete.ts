import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteAllReplies() {
  await prisma.user.deleteMany({
    where: {
      id: {
        not: 73,
      },
    },
  });
  console.log("All replies have been deleted.");
}

deleteAllReplies()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
