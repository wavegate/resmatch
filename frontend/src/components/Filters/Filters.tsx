import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { Button } from "@mantine/core";

interface FiltersProps {
  selectedProgram?: any; // Replace with the correct type if available
  setSelectedProgram: (program: any) => void; // Replace with the correct type if available
  clearFilters: () => void;
}

export default function Filters({
  selectedProgram,
  setSelectedProgram,
  clearFilters,
}: FiltersProps) {
  return (
    <div className={`flex flex-col gap-3 items-start`}>
      <Button onClick={clearFilters}>Clear Filters</Button>
      <ProgramSearch
        onProgramSelect={(value) => {
          setSelectedProgram(value);
        }}
        selected={selectedProgram?.id}
      />
    </div>
  );
}
