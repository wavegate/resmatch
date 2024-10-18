// Import the required modules
import fs from "fs/promises";
import Papa from "papaparse";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

async function processTSV(filePath) {
  try {
    // Read the file content
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Parse the TSV data using PapaParse
    const result = Papa.parse(fileContent, {
      delimiter: "\t", // Specify tab as the delimiter
      header: true, // First row is a header
      skipEmptyLines: true, // Skip empty lines
    });

    // Access the parsed data
    const data = result.data;

    // Iterate over each row and process the institution data
    for (const row of data) {
      const {
        "Institution Name": institutionName,
        "Institution Code": institutionCode,
      } = row;

      // Look up the institution by institutionCode
      let institution = await prisma.institution.findUnique({
        where: { institutionCode },
      });

      // If the institution exists, compare the names
      if (institution) {
        if (institution.name !== institutionName) {
          console.log(
            `Name discrepancy for institution code ${institutionCode}: Updating name from "${institution.name}" to "${institutionName}".`
          );
          // Update the institution's name to match the TSV file
          institution = await prisma.institution.update({
            where: { institutionCode },
            data: { name: institutionName },
          });
        }
      } else {
        // If the institution doesn't exist, create it
        institution = await prisma.institution.create({
          data: {
            name: institutionName,
            institutionCode,
          },
        });
        console.log(
          `Created new institution: ${institutionName} with code: ${institutionCode}`
        );
      }
    }

    console.log("All institutions have been processed successfully.");
  } catch (error) {
    console.error("Error processing TSV file:", error);
  } finally {
    // Close the Prisma Client connection when done
    await prisma.$disconnect();
  }
}

// Call the function with the path to your TSV file
const filePath = "./seedData/institutions2.tsv";
processTSV(filePath);
