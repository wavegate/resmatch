import programName from "@/utils/programName";
import { Badge } from "@mantine/core";

interface ProgramHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function ProgramHeader({ item }: ProgramHeaderProps) {
  return (
    <div
      className={`
    bg-primary bg-opacity-10 px-4 max-sm:px-3 py-2`}
    >
      <div className={`font-medium sm:text-lg`}>{programName(item)}</div>
    </div>
  );
}
