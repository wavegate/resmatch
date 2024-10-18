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
          tierListId: 1, // Add to the TierList with id 1 (adjust as needed)
        },
      });

      binMap[binName] = bin.id; // Map the bin name to its ID
      console.log(`Created bin: ${binName}`);
    }

    // Now iterate over each row to create BinAssignments with rank
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      const row = data[rowIndex];

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
            // Create a BinAssignment with the appropriate rank
            await prisma.binAssignment.create({
              data: {
                binId: binId,
                programId: program.id,
                rank: rowIndex + 1, // The row index + 1 will be used as the rank within the bin
              },
            });

            console.log(
              `Assigned program ${program.name} to bin ${
                binNames[i]
              } with rank ${rowIndex + 1}`
            );
          } else {
            console.error(
              `Program not found for NRMP program code: ${programCode}`
            );
          }
        }
      }
    }

    console.log(
      "All programs have been assigned to their respective bins with ranks."
    );
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

// import fs from "fs/promises";
// import Papa from "papaparse";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function processTSV(filePath: string) {
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
//     const binNames = result.meta.fields; // Extract the header row as bin names
//     const data = result.data; // The rest of the rows are the program codes

//     // Iterate over each bin name and create a Bin in the database
//     const binMap: Record<string, number> = {}; // To map bin names to their IDs
//     for (let i = 0; i < binNames.length; i++) {
//       const binName = binNames[i];

//       // Create a Bin in the database
//       const bin = await prisma.bin.create({
//         data: {
//           name: binName,
//           order: i + 1, // Use the index + 1 as the order
//           tierListId: 2, // Add to the TierList with id 2 (specific for this list)
//         },
//       });

//       binMap[binName] = bin.id; // Map the bin name to its ID
//       console.log(`Created bin: ${binName}`);
//     }

//     // Now iterate over each row to create BinAssignments with rank
//     for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
//       const row = data[rowIndex];

//       for (let i = 0; i < binNames.length; i++) {
//         const programCode = row[binNames[i]];
//         const binId = binMap[binNames[i]];

//         if (programCode) {
//           // Find the program by its NRMP program code
//           const program = await prisma.program.findFirst({
//             where: {
//               nrmpProgramCode: programCode, // Assuming the NRMP code field is named 'nrmpProgramCode'
//             },
//           });

//           if (program) {
//             // Create a BinAssignment with the appropriate rank
//             await prisma.binAssignment.create({
//               data: {
//                 binId: binId,
//                 programId: program.id,
//                 rank: rowIndex + 1, // The row index + 1 will be used as the rank within the bin
//               },
//             });

//             console.log(
//               `Assigned program ${program.name} to bin ${
//                 binNames[i]
//               } with rank ${rowIndex + 1}`
//             );
//           } else {
//             console.error(
//               `Program not found for NRMP program code: ${programCode}`
//             );
//           }
//         }
//       }
//     }

//     console.log(
//       "All programs have been assigned to their respective bins with ranks."
//     );
//   } catch (error) {
//     console.error("Error processing TSV file:", error);
//   } finally {
//     // Close the Prisma Client connection when done
//     await prisma.$disconnect();
//   }
// }

// // Call the function with the path to your TSV file
// const filePath = "./seedData/imgtierlist.tsv";
// processTSV(filePath);
