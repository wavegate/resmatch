import programName from "@/utils/programName";
import { Badge } from "@mantine/core";

export default function ProgramName({ program }) {
  console.log(program);
  if (!program?.institution?.name) {
    return <span>Data missing</span>;
  }

  // Use the programName utility function to get the name with optional suffix
  const nameWithSuffix = programName(program);

  // Determine the badge content and color based on the second-to-last character in the NRMP Program Code
  const getBadge = () => {
    if (!program.nrmpProgramCode || program.nrmpProgramCode.length < 2)
      return null;

    const secondLastChar = program.nrmpProgramCode.slice(-2, -1);
    let badgeColor = "";

    switch (secondLastChar) {
      case "C":
        badgeColor = "blue";
        break;
      case "P":
        badgeColor = "green";
        break;
      case "M":
        badgeColor = "red";
        break;
      default:
        return null;
    }

    return (
      <Badge color={badgeColor} size="sm" radius="xl" variant="filled" ml={5}>
        {secondLastChar}
      </Badge>
    );
  };

  return (
    <div>
      {nameWithSuffix}
      {getBadge()}
    </div>
  );
}
