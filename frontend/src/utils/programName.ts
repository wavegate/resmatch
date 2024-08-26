export default function programName(program) {
  if (!program?.institution?.name) {
    return `Data missing`;
  }

  if (program.name === "Internal Medicine") {
    return `${program.institution.name}`;
  }

  return `${program.name} at ${program.institution.name}`;
}
