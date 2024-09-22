import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { readFileSync } from "fs";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Path to the JSON file
const jsonFilePath = join(process.cwd(), "seedData", "questionsData.json");

// Read and parse the JSON file
const fameShameData = JSON.parse(readFileSync(jsonFilePath, "utf-8"));

// User ID to associate with the entries
const userId = 73;

// Set the createdAt date to May 30, 2024
const createdAt = new Date("2024-05-30");

async function createFameShameEntries() {
  for (const entry of fameShameData) {
    // Destructure comments and nrmpProgramCode from the entry
    const { nrmpProgramCode, questions } = entry;

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

      // Create the FameShame entry with the found programId and createdAt date
      const fameShameEntry = await prisma.question.create({
        data: {
          userId: userId,
          programId: program.id, // Use the found program's ID
          questions: [questions],
          createdAt: createdAt, // Set the createdAt date
        },
      });

      // If there is a comments entry, create a Comment
      // if (comments) {
      //   await prisma.comment.create({
      //     data: {
      //       userId: userId,
      //       content: comments,
      //       interviewImpressionId: fameShameEntry.id,
      //     },
      //   });
      // }

      console.log(`Created FameShame entry with ID ${fameShameEntry.id}`);
    } catch (error) {
      console.error("Error creating FameShame entry:", error);
    }
  }

  // Close the Prisma Client connection
  await prisma.$disconnect();
}

// Run the function
createFameShameEntries().catch((error) => {
  console.error("Error processing FameShame data:", error);
  prisma.$disconnect();
});
