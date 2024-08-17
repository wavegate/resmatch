import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { filtersMap } from "@/schemas/schemas";
import { Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { FaRegCalendarAlt } from "react-icons/fa";

interface FiltersProps {
  selectedProgram?: any; // Replace with the correct type if available
  setSelectedProgram: (program: any) => void; // Replace with the correct type if available
  clearFilters: () => void;
}

export default function Filters({
  selectedProgram,
  setSelectedProgram,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  modelName,
  clearFilters,
}: FiltersProps) {
  const filters = filtersMap[modelName];
  return (
    <div className={`flex flex-col gap-3 items-start`}>
      <Button onClick={clearFilters}>Clear Filters</Button>
      {filters?.includes("startDate") && (
        <DateInput
          label="Pick start date"
          placeholder="Pick start date"
          value={startDate}
          onChange={setStartDate}
          clearable
          size="md"
          leftSection={<FaRegCalendarAlt />}
          maxDate={endDate ? dayjs(endDate).toDate() : undefined}
        />
      )}
      {filters?.includes("endDate") && (
        <DateInput
          label="Pick end date"
          placeholder="Pick end date"
          value={endDate}
          onChange={setEndDate}
          clearable
          size="md"
          leftSection={<FaRegCalendarAlt />}
          minDate={startDate ? dayjs(startDate).toDate() : undefined}
        />
      )}
      <ProgramSearch
        onProgramSelect={(value) => {
          setSelectedProgram(value);
        }}
        selected={selectedProgram?.id}
      />
    </div>
  );
}
