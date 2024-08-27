import { Badge } from "@mantine/core";
import { IoMdClose } from "react-icons/io";

export default function ProgramBadges({
  searchTerm,
  setSearchInput,
  state,
  setState,
  setPageNum,
}) {
  return (
    <div className="inline-flex gap-1 mt-2">
      {searchTerm && (
        <Badge
          rightSection={
            <IoMdClose
              onClick={() => {
                setSearchInput("");
                setPageNum(1);
              }}
            />
          }
        >
          {searchTerm}
        </Badge>
      )}
      {state && (
        <Badge
          rightSection={
            <IoMdClose
              onClick={() => {
                setState(null);
                setPageNum(1);
              }}
            />
          }
        >
          {state}
        </Badge>
      )}
    </div>
  );
}
