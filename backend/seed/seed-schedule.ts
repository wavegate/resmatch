import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { readFileSync } from "fs";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Path to the JSON file
const jsonFilePath = join(process.cwd(), "seedData", "schedules1.json");

// Read and parse the JSON file
const scheduleData = JSON.parse(readFileSync(jsonFilePath, "utf-8"));

// User ID to associate with the entries
const userId = 73;

async function createScheduleDetails() {
  for (const entry of scheduleData) {
    // Destructure comments and nrmpProgramCode from the entry
    const { comments, nrmpProgramCode, ...scheduleDetailsData } = entry;

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

      // Create the ScheduleDetails entry with the found programId
      const scheduleDetails = await prisma.scheduleDetails.create({
        data: {
          userId: userId,
          programId: program.id, // Use the found program's ID
          ...scheduleDetailsData,
        },
      });

      // If there is a comments entry, create a Comment
      if (comments) {
        await prisma.comment.create({
          data: {
            userId: userId,
            content: comments,
            scheduleDetailsId: scheduleDetails.id,
          },
        });
      }

      console.log(`Created ScheduleDetails with ID ${scheduleDetails.id}`);
    } catch (error) {
      console.error("Error creating ScheduleDetails:", error);
    }
  }

  // Close the Prisma Client connection
  await prisma.$disconnect();
}

// Run the function
createScheduleDetails().catch((error) => {
  console.error("Error processing schedule data:", error);
  prisma.$disconnect();
});
