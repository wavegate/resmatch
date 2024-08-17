export default function programName(program) {
  if (!program?.institution?.name) {
    return `Data missing`;
  }
  return `${program.name} at ${program.institution.name}`;
}
