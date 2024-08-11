import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function setPublicToFalseForAllUsers() {
  try {
    await prisma.user.updateMany({
      data: {
        public: false, // Set the 'public' field to false for all users
      },
    });

    console.log("The 'public' field has been set to false for all users.");
  } catch (error) {
    console.error("Error updating 'public' field for users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

setPublicToFalseForAllUsers()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
