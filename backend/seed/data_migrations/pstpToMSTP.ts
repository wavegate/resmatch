import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function migratePSTPToMSTP() {
  try {
    // Find all users where pstp is true or false (assuming it's a boolean)
    const usersWithPSTP = await prisma.user.findMany({
      where: {
        pstp: {
          not: null, // Adjust based on your pstp field setup, if null values are possible.
        },
      },
    });

    // Loop through each user and update their mstp field
    for (const user of usersWithPSTP) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          mstp: user.pstp, // Move the pstp value to mstp
          pstp: null, // Optionally set pstp to null before removing it in schema
        },
      });
    }

    console.log(
      `Successfully migrated ${usersWithPSTP.length} users from pstp to mstp.`
    );
  } catch (error) {
    console.error("Error migrating PSTP to MSTP: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration function
migratePSTPToMSTP();
