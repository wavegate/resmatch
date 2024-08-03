import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
  const specialties = [];

  // Path to the CSV file
  const filePath = path.resolve(__dirname, "seedData/specialties.csv");

  // Read and parse the CSV file
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Push each row of data to the specialties array
        specialties.push({
          specialtyCode: row.specialtyCode,
          name: row.name,
        });
      })
      .on("end", () => {
        resolve();
      })
      .on("error", reject);
  });

  // Insert data into the database
  for (const specialty of specialties) {
    await prisma.specialty.upsert({
      where: { specialtyCode: specialty.specialtyCode },
      update: {},
      create: specialty,
    });
  }

  console.log("Specialties data has been seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
