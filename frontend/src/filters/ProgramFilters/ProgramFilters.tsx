import { TextInput, Button } from "@mantine/core";
import { IoMdClose } from "react-icons/io";

interface ProgramFiltersProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  clearFilters: () => void;
}

export default function ProgramFilters({
  searchTerm,
  setSearchTerm,
  clearFilters,
}: ProgramFiltersProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <TextInput
        label="Search Programs"
        placeholder="Search by program name"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
      />

      {searchTerm && (
        <Button
          variant="outline"
          leftSection={<IoMdClose />}
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
