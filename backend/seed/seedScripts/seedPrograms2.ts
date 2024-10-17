// Import the required modules
import fs from "fs/promises";
import Papa from "papaparse";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to convert a string to title case
function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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

    // Iterate over each row and process the program data
    for (const row of data) {
      const {
        "Program Name": programName,
        City: cityName,
        State: stateName,
        "Institution Name": institutionName,
        "NRMP Code": nrmpProgramCode,
        "ACGME Code": acgmeCode,
      } = row;

      // Extract the first four digits of the NRMP code to find the institution
      const institutionCode = nrmpProgramCode.slice(0, 4);

      // Extract the 5th to 7th digits of the NRMP code to find the specialty (assuming specialties are defined with these codes)
      const specialtyCode = nrmpProgramCode.slice(4, 7);

      // Look up the institution by institutionCode
      let institution = await prisma.institution.findUnique({
        where: { institutionCode },
      });

      if (!institution) {
        console.error(
          `Institution with code ${institutionCode} not found for program ${programName}.`
        );
        continue; // Skip this program if the institution is not found
      }

      // Look up the specialty by its code (assuming you have a Specialty model and a way to map these codes)
      let specialty = await prisma.specialty.findUnique({
        where: { specialtyCode: specialtyCode },
      });

      if (!specialty) {
        console.error(
          `Specialty with code ${specialtyCode} not found for program ${programName}.`
        );
        continue; // Skip this program if the specialty is not found
      }

      // Look up the city by cityName and stateName
      let city = await prisma.city.findFirst({
        where: {
          name: titleCase(cityName),
          state: titleCase(stateName),
        },
      });

      // If the city doesn't exist, create it
      if (!city) {
        city = await prisma.city.create({
          data: {
            name: titleCase(cityName),
            state: titleCase(stateName),
          },
        });
        console.log(`Created new city: ${city.name}, ${city.state}`);
      }

      // Look up the program by NRMP code
      let program = await prisma.program.findUnique({
        where: { nrmpProgramCode },
      });

      if (program) {
        // Update the city's association if the program exists

        program = await prisma.program.update({
          where: { nrmpProgramCode },
          data: {
            cityId: city.id,
            acgmeCode,
          },
        });
        console.log(
          `Updated program ${programName} with NRMP code ${nrmpProgramCode} to city ${city.name}, ${city.state}`
        );
      } else {
        // If the program doesn't exist, create it
        program = await prisma.program.create({
          data: {
            name: programName,
            institutionId: institution.id,
            specialtyId: specialty.id,
            cityId: city.id,
            nrmpProgramCode,
            acgmeCode,
          },
        });
        console.log(
          `Created new program: ${programName} with NRMP code ${nrmpProgramCode}`
        );
      }
    }

    console.log("All programs have been processed successfully.");
  } catch (error) {
    console.error("Error processing TSV file:", error);
  } finally {
    // Close the Prisma Client connection when done
    await prisma.$disconnect();
  }
}

// Call the function with the path to your TSV file
const filePath = "./seedData/programs2.tsv";
processTSV(filePath);
