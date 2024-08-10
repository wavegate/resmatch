import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { FaRegCalendarAlt } from "react-icons/fa";

export default ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setSelectedProgram,
  selectedProgram,
  clearFilters,
}) => {
  return (
    <div className={`flex flex-col gap-3 items-start`}>
      <Button onClick={clearFilters}>Clear Filters</Button>
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
      <ProgramSearch
        onProgramSelect={(value) => {
          setSelectedProgram(value);
        }}
        selected={selectedProgram?.id}
      />
    </div>
  );
};
