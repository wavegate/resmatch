import cityService from "@/services/cityService";
import { TextInput, Button, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { IoMdClose } from "react-icons/io";

interface ProgramFiltersProps {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  clearFilters: () => void;
}

export default function ProgramFilters({
  searchInput,
  setSearchInput,
  clearFilters,
  state,
  setState,
  setPageNum,
}: ProgramFiltersProps) {
  const { data: states, isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: cityService.getStates,
  });

  const stateOptions = states?.map((stateItem) => ({
    value: stateItem.state,
    label: stateItem.state,
  }));

  return (
    <div className="flex flex-col gap-4 p-4">
      <TextInput
        label="Search Programs"
        placeholder="Search by institution name"
        value={searchInput}
        onChange={(event) => {
          setSearchInput(event.currentTarget.value);
          setPageNum(1);
        }}
        size="md"
      />

      <Select
        label="Select State"
        placeholder="Pick a state"
        value={state}
        onChange={(value) => {
          setState(value);
          setPageNum(1);
        }}
        data={stateOptions || []}
        size="md"
        disabled={isLoading}
        clearable
      />

      {searchInput && (
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
