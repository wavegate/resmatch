import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
  const institutions = [];

  // Path to the CSV file
  const filePath = path.resolve(__dirname, "seedData/institutions.csv");

  // Read and parse the CSV file
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Push each row of data to the institutions array
        institutions.push({
          institutionCode: row.institutionCode,
          name: row.name,
        });
      })
      .on("end", () => {
        resolve();
      })
      .on("error", reject);
  });

  // Insert data into the database
  for (const institution of institutions) {
    console.log("inserting");
    await prisma.institution.upsert({
      where: { institutionCode: institution.institutionCode },
      update: {},
      create: institution,
    });
  }

  console.log("Institutions data has been seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
