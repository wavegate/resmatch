const fs = require("fs");

// Read the TSV file
fs.readFile("./seedData/findduplicates.tsv", "utf8", (err, data) => {
  if (err) {
    console.error("Could not read file:", err);
    return;
  }

  // Split the file content into lines
  const lines = data.trim().split("\n");

  // Extract the header and the institution codes
  const institutionCodes = lines;

  // Use a map to track the frequency of each institution code
  const frequencyMap = {};
  institutionCodes.forEach((code) => {
    if (frequencyMap[code]) {
      frequencyMap[code]++;
    } else {
      frequencyMap[code] = 1;
    }
  });

  // Find and print the duplicate institution codes
  const duplicates = Object.keys(frequencyMap).filter(
    (code) => frequencyMap[code] > 1
  );

  if (duplicates.length > 0) {
    console.log("Duplicate Institution Codes:");
    duplicates.forEach((code) => console.log(code));
  } else {
    console.log("No duplicates found.");
  }
});
