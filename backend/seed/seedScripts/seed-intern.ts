import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { readFileSync } from "fs";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Path to the JSON file
const jsonFilePath = join(process.cwd(), "seedData", "m4internData.json");

// Read and parse the JSON file
const m4InternData = JSON.parse(readFileSync(jsonFilePath, "utf-8"));

// User ID to associate with the entries
const userId = 73;

// Set the createdAt date to May 30, 2024
const createdAt = new Date("2024-05-30");

async function createM4InternEntries() {
  for (const entry of m4InternData) {
    // Destructure comments and nrmpProgramCode from the entry
    const { comments, nrmpProgramCode, ...m4InternDetailsData } = entry;

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

      // Create the M4InternImpression entry with the found programId and createdAt date
      const m4InternEntry = await prisma.m4InternImpression.create({
        data: {
          userId: userId,
          programId: program.id, // Use the found program's ID
          ...m4InternDetailsData,
          createdAt: createdAt, // Set the createdAt date
        },
      });

      // If there is a comments entry, create a Comment
      if (comments) {
        await prisma.comment.create({
          data: {
            userId: userId,
            content: comments,
            m4InternImpressionId: m4InternEntry.id, // Use the M4InternImpression's ID
          },
        });
      }

      // console.log(`Created M4InternImpression entry with ID ${m4InternEntry.id}`);
    } catch (error) {
      console.error("Error creating M4InternImpression entry:", error);
    }
  }

  // Close the Prisma Client connection
  await prisma.$disconnect();
}

// Run the function
createM4InternEntries().catch((error) => {
  console.error("Error processing m4intern data:", error);
  prisma.$disconnect();
});
