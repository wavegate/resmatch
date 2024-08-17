// // Import the required modules
// import fs from "fs/promises";
// import Papa from "papaparse";
// import { PrismaClient } from "@prisma/client";

// // Initialize Prisma Client
// const prisma = new PrismaClient();

// async function processTSV(filePath) {
//   try {
//     // Read the file content
//     const fileContent = await fs.readFile(filePath, "utf-8");

//     // Parse the TSV data using PapaParse
//     const result = Papa.parse(fileContent, {
//       delimiter: "\t", // Specify tab as the delimiter
//       header: true, // First row is the header (bin names)
//       skipEmptyLines: true, // Skip empty lines
//     });

//     // Access the parsed data (header will be the bin names)
//     const binNames = result.meta.fields; // Extract the header row as bin names// Iterate over each bin name and create a Bin in the database
//     for (let i = 0; i < binNames.length; i++) {
//       const binName = binNames[i];

//       // Create a Bin in the database
//       await prisma.bin.create({
//         data: {
//           name: binName,
//           order: i + 1, // Use the index + 1 as the order
//           tierListId: 1, // Add to the TierList with id 1
//         },
//       });

//       console.log(`Created bin: ${binName}`);
//     }

//     console.log("All bins have been created successfully.");
//   } catch (error) {
//     console.error("Error processing TSV file:", error);
//   } finally {
//     // Close the Prisma Client connection when done
//     await prisma.$disconnect();
//   }
// }

// // Call the function with the path to your TSV file
// const filePath = "./seedData/ustierlist.tsv";
// processTSV(filePath);

import fs from "fs/promises";
import Papa from "papaparse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function processTSV(filePath: string) {
  try {
    // Read the file content
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Parse the TSV data using PapaParse
    const result = Papa.parse(fileContent, {
      delimiter: "\t", // Specify tab as the delimiter
      header: true, // First row is the header (bin names)
      skipEmptyLines: true, // Skip empty lines
    });

    // Access the parsed data (header will be the bin names)
    const binNames = result.meta.fields; // Extract the header row as bin names
    const data = result.data; // The rest of the rows are the program codes

    // Iterate over each bin name and create a Bin in the database
    const binMap: Record<string, number> = {}; // To map bin names to their IDs
    for (let i = 0; i < binNames.length; i++) {
      const binName = binNames[i];

      // Create a Bin in the database
      const bin = await prisma.bin.create({
        data: {
          name: binName,
          order: i + 1, // Use the index + 1 as the order
          tierListId: 1, // Add to the TierList with id 1
        },
      });

      binMap[binName] = bin.id; // Map the bin name to its ID
      console.log(`Created bin: ${binName}`);
    }

    // Now iterate over each row to assign programs to bins
    for (const row of data) {
      for (let i = 0; i < binNames.length; i++) {
        const programCode = row[binNames[i]];
        const binId = binMap[binNames[i]];

        if (programCode) {
          // Find the program by its NRMP program code
          const program = await prisma.program.findFirst({
            where: {
              nrmpProgramCode: programCode, // Assuming the NRMP code field is named 'nrmpProgramCode'
            },
          });

          if (program) {
            // Update the program to associate it with the bin
            await prisma.program.update({
              where: {
                id: program.id,
              },
              data: {
                Bin: {
                  connect: { id: binId },
                },
              },
            });

            console.log(`Added program ${program.name} to bin ${binNames[i]}`);
          } else {
            console.error(
              `Program not found for NRMP program code: ${programCode}`
            );
          }
        }
      }
    }

    console.log("All programs have been assigned to their respective bins.");
  } catch (error) {
    console.error("Error processing TSV file:", error);
  } finally {
    // Close the Prisma Client connection when done
    await prisma.$disconnect();
  }
}

// Call the function with the path to your TSV file
const filePath = "./seedData/ustierlist.tsv";
processTSV(filePath);
