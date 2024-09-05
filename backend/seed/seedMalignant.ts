import { createReadStream, writeFileSync } from "fs";
import { join } from "path";
import readline from "readline";
import { hasDataBeyondNrmpCode } from "./seedSchedule";

// Path to the CSV file for mapping program names to NRMP codes
const csvFilePath = join(process.cwd(), "seedData/nameToNrmpProgramCode.csv");

// Function to read the CSV and create the map
async function createProgramMap() {
  const programMap = new Map();

  const fileStream = createReadStream(csvFilePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const columns = line.split(",");
    if (columns.length >= 2) {
      const programName = columns[0].trim();
      const programCode = columns[columns.length - 1].trim();
      programMap.set(programName, programCode);
    }
  }

  return programMap;
}

// Path to the TSV file and the output JSON file
const tsvFilePath = join(process.cwd(), "seedData/malignantDetails.tsv");
const jsonOutputPath = join(process.cwd(), "seedData/malignantData.json");

// Columns in the TSV file
const columns = [
  "programName", // Maps to programId via NRMP Program Code
  "malignant", // MalignantEnum field
  "source", // String
  "explanation", // String
  "comments", // Array of Comment (can be a string in this context)
];

// Function to process the TSV file and store each row as an object
async function processTsvFile(programMap) {
  const malignantData = [];

  const fileStream = createReadStream(tsvFilePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const values = line.split("\t");
    const malignantObject = {};

    values.forEach((value, index) => {
      const columnName = columns[index];
      if (value !== "0" && value !== "" && columnName) {
        if (columnName === "programName") {
          // Replace programName with its NRMP code (programId)
          const nrmpCode = programMap.get(value.trim());
          if (nrmpCode) {
            malignantObject["nrmpProgramCode"] = nrmpCode;
          }
        } else if (columnName === "comments") {
          // Handle comments as an array or single string depending on your schema
          malignantObject[columnName] = value.trim();
        } else {
          malignantObject[columnName] = value.trim();
        }
      }
    });

    // Add the object only if it has a valid programId
    if (
      malignantObject["nrmpProgramCode"] &&
      malignantObject["malignant"] &&
      hasDataBeyondNrmpCode(malignantObject)
    ) {
      malignantData.push(malignantObject);
    }
  }

  // Save the cleaned and processed data as a JSON file
  writeFileSync(jsonOutputPath, JSON.stringify(malignantData, null, 2));
  console.log(`Data saved to ${jsonOutputPath}`);
}

// Example usage
async function main() {
  const programMap = await createProgramMap();
  await processTsvFile(programMap);
}

main().catch((err) => {
  console.error("Error processing the file:", err);
});
