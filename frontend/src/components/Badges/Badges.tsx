import { Badge } from "@mantine/core";
import { IoMdClose } from "react-icons/io";

export default function Badges({ selectedProgram, setSelectedProgram }) {
  return (
    <div className="inline-flex gap-1 mt-2">
      {selectedProgram && (
        <Badge
          rightSection={<IoMdClose onClick={() => setSelectedProgram(null)} />}
        >
          {`${selectedProgram.name} at ${selectedProgram.institution.name}`}
        </Badge>
      )}
    </div>
  );
}
