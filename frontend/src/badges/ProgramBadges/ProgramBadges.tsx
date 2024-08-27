import { Badge } from "@mantine/core";
import { IoMdClose } from "react-icons/io";

export default function ProgramBadges({
  searchTerm,
  setSearchInput,
  state,
  setState,
}) {
  return (
    <div className="inline-flex gap-1 mt-2">
      {searchTerm && (
        <Badge rightSection={<IoMdClose onClick={() => setSearchInput("")} />}>
          {searchTerm}
        </Badge>
      )}
      {state && (
        <Badge rightSection={<IoMdClose onClick={() => setState(null)} />}>
          {state}
        </Badge>
      )}
    </div>
  );
}
