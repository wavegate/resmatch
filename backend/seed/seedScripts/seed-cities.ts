// Import the required modules
import fs from "fs/promises";
import Papa from "papaparse";
import { PrismaClient } from "@prisma/client";

console.log("hi");

// Initialize Prisma Client
const prisma = new PrismaClient();

// The userId for CityUserInput creation
const userId = 73;

async function processTSV(filePath) {
  try {
    // Read the file content
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Parse the TSV data using PapaParse
    const result = Papa.parse(fileContent, {
      delimiter: "\t", // Specify tab as the delimiter
      header: false, // First row is not a header
      skipEmptyLines: true, // Skip empty lines
    });

    // Access the parsed data
    const data = result.data;

    // Iterate over each row and create a City and CityUserInput
    for (const row of data) {
      const [
        state,
        name,
        pros,
        cons,
        publicTransportation,
        weather,
        dating,
        lgbtq,
        diversity,
        safetyCrime,
      ] = row;

      // Create a City in the database
      const city = await prisma.city.create({
        data: {
          state,
          name,
        },
      });

      // Create a CityUserInput associated with the created City
      await prisma.cityUserInput.create({
        data: {
          pros,
          cons,
          publicTransportation,
          weather,
          dating,
          lgbtq,
          diversity,
          safetyCrime,
          userId,
          cityId: city.id, // Link to the created city
        },
      });

      console.log(`Created city and user input: ${name}, ${state}`);
    }

    console.log(
      "All cities and their user inputs have been created successfully."
    );
  } catch (error) {
    console.error("Error processing TSV file:", error);
  } finally {
    // Close the Prisma Client connection when done
    await prisma.$disconnect();
  }
}

// Call the function with the path to your TSV file
const filePath = "./seedData/cities.tsv";
processTSV(filePath);
