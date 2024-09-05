import { createReadStream, writeFileSync } from "fs";
import { join } from "path";
import readline from "readline";

// Path to the CSV file
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
const tsvFilePath = join(process.cwd(), "seedData/scheduleDetails.tsv");
const jsonOutputPath = join(process.cwd(), "seedData/schedules1.json");

// Columns to be processed (order matters)
const columns = [
  "programName",
  "longOvernightCall",
  "scheduleContinuity",
  "locations",
  "emr",
  "startDateOrientation",
  "visaInfo",
  "union",
  "midlevel",
  "ancillary",
  "teamRatios",
  "internCap",
  "admittingSystem",
  "icuHours",
  "nightFloat",
  "sickCallSystem",
  "moonlighting",
  "stayUntilSignout",
  "didactics",
  "moonlighting",
  "vacationHolidays",
  "gym",
  "food",
  "comments",
  "salary",
];

// Function to check if an object contains any data beyond the nrmpProgramCode
export function hasDataBeyondNrmpCode(programObject) {
  const keys = Object.keys(programObject);
  return (
    keys.length > 1 || (keys.length === 1 && keys[0] !== "nrmpProgramCode")
  );
}

// Function to process the TSV file and store each row as an object
async function processTsvFile(programMap) {
  const programData = [];

  const fileStream = createReadStream(tsvFilePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let rowCount = 0;

  for await (const line of rl) {
    // if (rowCount >= 30) break; // Process only the first 30 rows

    const values = line.split("\t");
    const programObject = {};

    values.forEach((value, index) => {
      const columnName = columns[index];
      if (value !== "0" && value !== "" && columnName) {
        if (columnName === "moonlighting" && programObject[columnName]) {
          // If moonlighting already has a value, append the new value
          programObject[columnName] += `; ${value.trim()}`;
        } else if (columnName === "programName") {
          // Replace programName with its NRMP code
          const nrmpCode = programMap.get(value.trim());
          if (nrmpCode) {
            programObject["nrmpProgramCode"] = nrmpCode;
          }
        } else if (columnName === "union") {
          // Convert union to a boolean
          if (value.toLowerCase() === "true") {
            programObject[columnName] = true;
          } else if (value.toLowerCase() === "false") {
            programObject[columnName] = false;
          } else {
            programObject[columnName] = value; // Keep as is if not "Yes" or "No"
          }
        } else {
          programObject[columnName] = value.trim();
        }
      }
    });

    if (
      programObject["nrmpProgramCode"] &&
      hasDataBeyondNrmpCode(programObject)
    ) {
      programData.push(programObject);
    }

    rowCount++;
  }

  // Save the cleaned and processed data as a JSON file
  writeFileSync(jsonOutputPath, JSON.stringify(programData, null, 2));
  console.log(`Data saved to ${jsonOutputPath}`);
}

// Example usage
async function main() {
  const programMap = await createProgramMap(); // Assuming createProgramMap is defined elsewhere
  await processTsvFile(programMap);
}

main().catch((err) => {
  console.error("Error processing the file:", err);
});
