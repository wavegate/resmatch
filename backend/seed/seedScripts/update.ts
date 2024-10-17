import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function setGraduateTypeToUSForAllUsers() {
  try {
    await prisma.user.updateMany({
      data: {
        graduateType: "US", // Set the 'graduateType' field to "US" for all users
      },
    });

    console.log("The 'graduateType' field has been set to 'US' for all users.");
  } catch (error) {
    console.error("Error updating 'graduateType' field for users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

setGraduateTypeToUSForAllUsers()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
