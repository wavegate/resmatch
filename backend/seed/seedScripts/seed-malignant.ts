import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { readFileSync } from "fs";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Path to the JSON file
const jsonFilePath = join(process.cwd(), "seedData", "malignantData.json");

// Read and parse the JSON file
const malignantData = JSON.parse(readFileSync(jsonFilePath, "utf-8"));

// User ID to associate with the entries
const userId = 73;

// Set the createdAt date to May 30, 2024
const createdAt = new Date("2024-05-30");

async function createMalignantEntries() {
  for (const entry of malignantData) {
    // Destructure comments and nrmpProgramCode from the entry
    const { comments, nrmpProgramCode, ...malignantDetailsData } = entry;

    try {
      // Find the program by nrmpProgramCode
      const program = await prisma.program.findUnique({
        where: {
          nrmpProgramCode: nrmpProgramCode,
        },
      });

      if (!program) {
        console.error(`Program not found for NRMP code: ${nrmpProgramCode}`);
        continue; // Skip to the next entry if program is not found
      }

      // Create the Malignant entry with the found programId and createdAt date
      const malignantEntry = await prisma.malignant.create({
        data: {
          userId: userId,
          programId: program.id, // Use the found program's ID
          ...malignantDetailsData,
          createdAt: createdAt, // Set the createdAt date
        },
      });

      // If there is a comments entry, create a Comment
      if (comments) {
        await prisma.comment.create({
          data: {
            userId: userId,
            content: comments,
            malignantId: malignantEntry.id,
          },
        });
      }

      // console.log(`Created Malignant entry with ID ${malignantEntry.id}`);
    } catch (error) {
      console.error("Error creating Malignant entry:", error);
    }
  }

  // Close the Prisma Client connection
  await prisma.$disconnect();
}

// Run the function
createMalignantEntries().catch((error) => {
  console.error("Error processing malignant data:", error);
  prisma.$disconnect();
});
