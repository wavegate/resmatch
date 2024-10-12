export default function programName(program) {
  if (!program?.institution?.name) {
    return `Loading...`;
  }

  // Initialize the suffix as an empty string
  let suffix = "";

  // Add the last two characters of the NRMP Program Code if the program name is "Internal Medicine" and it doesn't end with 'C0'
  if (
    program.name === "Internal Medicine" &&
    program.nrmpProgramCode &&
    !program.nrmpProgramCode.endsWith("C0")
  ) {
    suffix = ` (${program.nrmpProgramCode.slice(-2)})`;
  }

  // If the program name is "Internal Medicine", return the institution name with the optional suffix
  if (program.name === "Internal Medicine") {
    return `${program.institution.name}${suffix}`;
  }

  // Otherwise, return the program name followed by "at [Institution Name]"
  return `${program.name} at ${program.institution.name}`;
}
