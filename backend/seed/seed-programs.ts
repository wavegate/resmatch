import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
  const programs = [];

  // Path to the CSV file
  const filePath = path.resolve(__dirname, "seedData/programs.csv");

  // Read and parse the CSV file
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Extract the institutionCode and specialtyCode from the code
        const institutionCode = row.code.slice(0, 4);
        const specialtyCode = row.code.slice(4, 7);

        if (specialtyCode === "140") {
          programs.push({
            name: row.name,
            institutionCode,
            specialtyCode,
            nrmpProgramCode: row.code,
          });
        }
      })
      .on("end", () => {
        resolve();
      })
      .on("error", reject);
  });

  let counter = 0;

  // Insert data into the database
  for (const program of programs) {
    try {
      // Find the institutionId and specialtyId based on the codes
      const institution = await prisma.institution.findUnique({
        where: { institutionCode: program.institutionCode },
      });

      const specialty = await prisma.specialty.findUnique({
        where: { specialtyCode: program.specialtyCode },
      });

      if (institution && specialty) {
        const upsertedProgram = await prisma.program.upsert({
          where: {
            institutionId_specialtyId_name: {
              name: program.name,
              institutionId: institution.id,
              specialtyId: specialty.id,
            },
          },
          update: {},
          create: {
            name: program.name,
            institutionId: institution.id,
            specialtyId: specialty.id,
            nrmpProgramCode: program.nrmpProgramCode,
          },
        });
        counter++;

        console.log(
          `Upserted program: ${upsertedProgram.name} at ${institution.name}, ${specialty.name} = ${counter}`
        );
      } else {
        console.warn(
          `Skipping program "${program.name}": Missing institution or specialty.`
        );
      }
    } catch (error) {
      console.error(
        `Error inserting program "${program.name}": ${error.message}`
      );
    }
  }

  console.log("Programs data has been seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
