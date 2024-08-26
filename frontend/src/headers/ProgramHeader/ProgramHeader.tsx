import programName from "@/utils/programName";
import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface ProgramHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function ProgramHeader({ item }: ProgramHeaderProps) {
  return (
    <Accordion.Control className="bg-primary bg-opacity-10">
      <div className="flex flex-col gap-2">
        <div className={`font-medium text-lg`}>{programName(item)}</div>
      </div>
    </Accordion.Control>
  );
}
